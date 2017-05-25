// Core Imports....
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './services/auth-guard';

// Page Imports....
import { LoginPage } from './pages/login/login';
import { SignupPage } from './pages/signup/signup';
import { HomePage } from './pages/home/home';
import { ProfilePage } from './pages/profile/profile';


// App Routes....
const appRoutes: Routes = [
 { path: '', component: LoginPage },
 { path: 'signup', component: SignupPage },
 { path: 'home', component: HomePage, canActivate: [AuthGuard]},
 { path: 'profile', component: ProfilePage, canActivate: [AuthGuard]},
 { path: 'u/:tag', component: ProfilePage, canActivate: [AuthGuard]},
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
