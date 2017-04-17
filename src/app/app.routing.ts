//Core Imports....
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

//Page Imports....
import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login';
import { HomePage } from './pages/home/home';
import { ProfilePage } from './pages/profile/profile';


//App Routes....
const appRoutes: Routes = [
	{ path: '', component: LoginPage },
	{ path: 'home', component: HomePage},
	{ path: 'profile', component: ProfilePage}
]; 

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);