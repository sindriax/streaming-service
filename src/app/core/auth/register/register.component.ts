import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  authService = inject(AuthService);
  registerForm: FormGroup;
  submitted = false;
  router = inject(Router)
  


  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: [''],
      password: ['']
      // email: ['', [Validators.required, Validators.email, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      // password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/), Validators.minLength(8)]],
    });
  }

  submit() {
    console.log( "submit pressed" );
    this.submitted = true;
    if (this.registerForm.valid) {
      const newUser = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };
      console.log(newUser);

      this.authService.register(newUser).subscribe({
        next: () => {
          console.log('Registration successful');
          this.router.navigateByUrl('');
        },
        error: (err) => console.error('Registration error:', err)
      });
    }
  }


// resetForm() {
//   this.registerForm.reset();
//   this.submitted = false;
// }

}
