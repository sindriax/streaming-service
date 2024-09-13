import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { User, UserLogin, UserRegister, UserResponse } from '../../shared/interfaces/users';
import { catchError, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3000/users';
  private http = inject(HttpClient)
  private router = inject(Router);
  private localStorageService = inject(LocalStorageService);
  token ='';

  isLogged = signal<boolean>(false);


  constructor() {
    if(this.localStorageService.getToken()){
      this.isLogged.set(true);
    } else {
      this.isLogged.set(false);
    }
  }

  login(user: UserLogin) {
    return this.http.get<UserLogin[]>(`${this.url}?email=${user.email}&password=${user.password}`).pipe(
      tap((response: UserLogin[]) => {
        if (response.length > 0) {
          const fakeToken = 'fake-jwt-token';
          this.localStorageService.setToken(fakeToken);
          this.isLogged.set(true);
        } else {
          throw new Error('Invalid credentials');
        }
      }),
      catchError(error => {
        this.isLogged.set(false);
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  register(user: UserRegister) {
    const options = {
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json'
      },
    }
    
    return this.http.post<UserRegister>(`${this.url}`, user, options).pipe(
      tap((response: any) => {
        console.log('Registration successful:', response);
        const fakeToken = 'fake-jwt-token';
        this.localStorageService.setToken(fakeToken);
        this.isLogged.set(true);
      }),
      catchError(e => {
        console.error('Registration error:', e);
        return throwError(e);
      })
    );
  }


  logout (){
    this.localStorageService.removeToken();
    this.isLogged.set(false);
    this.router.navigate(['/home'])
  }

}
