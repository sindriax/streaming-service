import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const localStorageService = inject(LocalStorageService);
  return next(req).pipe(tap(( response : any) => {

    if (response.ok && response.url?.startsWith(`${environment.API_URL}/login`) ){
      console.log( 'login response is ok', response );
      localStorageService.setToken(response.body.token);
    } else if (response.ok && response.url?.startsWith(`${environment.API_URL}/register`)) {
      console.log('register response is ok', response );
      // localStorageService.setToken(response.body.token);
    }
    return response
  })
  )
};
