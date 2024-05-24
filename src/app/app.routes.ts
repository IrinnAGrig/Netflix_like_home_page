import { Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./pages/login/login.component').then(a => a.LoginComponent) },
    { path: 'browse', canActivate: [AuthGuard], loadComponent: () => import('./pages/browse/browse.component').then(a => a.BrowseComponent) }
];
