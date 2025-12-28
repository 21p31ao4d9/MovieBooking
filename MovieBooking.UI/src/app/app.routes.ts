import { Routes } from '@angular/router';
import { AuthGuard, UserGuard, AdminGuard } from '../auth.guard';

import { HomeComponent } from './home/home';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { MoviesComponent } from './movies/movies';
import { AdminTicketsComponent } from './admin/admin-ticket/admin-ticket';
import { UserTicketsComponent } from './user-tickets/user-tickets';
import { ForgotPasswordComponent } from './forgot-password/forgot-password';
import { ChangePasswordComponent } from './change-password/change-password';
import { AdminMoviesComponent } from './admin/admin-movies/admin-movies';
import { AdminMovieDeleteComponent } from './admin/admin-movie-delete/admin-movie-delete';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Public routes
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  // User-only routes
  { path: 'user/tickets', component: UserTicketsComponent, canActivate: [UserGuard] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },

  // Admin-only routes
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'admin/movies', component: AdminMoviesComponent, canActivate: [AdminGuard] },
  { path: 'admin/delete-movie', component: AdminMovieDeleteComponent, canActivate: [AdminGuard] },
  { path: 'admin/tickets', component: AdminTicketsComponent, canActivate: [AdminGuard] }
];
