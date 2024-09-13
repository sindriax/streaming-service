import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { LogoutComponent } from './core/auth/logout/logout.component';

export const routes: Routes = [
  {
    path: '',
    component: ProfilesComponent,
    canActivate:[authGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[authGuard]
  },
  {
    path: 'movies/:id',
    component: MovieComponent,
    canActivate:[authGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  }
];
