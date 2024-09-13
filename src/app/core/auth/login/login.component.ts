import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../../shared/interfaces/users';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  private authService = inject(AuthService)
  private formBuilder= inject(FormBuilder)
  router = inject(Router);
  loginForm!:FormGroup;
  // matcher = new CustomErrorStateMatcher();


  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      email: ["", Validators.required],
      password:["",Validators.required]
    });
  }

  submit(){
    if (this.loginForm.valid) {
      const user: UserLogin = {
        email: this.loginForm.controls["email"].value,
        password: this.loginForm.controls["password"].value,
      };
  
      this.authService.login(user).subscribe({
        next: () => {
          console.log("Login successful");
          this.router.navigateByUrl('');
        },
        error: (err) => {
          console.error("Login failed", err);
          alert('Login failed. Please check your credentials.');
        }
      });
    }
  }
}
