import { Routes } from '@angular/router';
import { LandingComponent } from './shared/landing/landing';
import { CustomerLoginComponent } from './auth/customer-login/customer-login';
import { RegisterComponent } from './auth/register/register';
import { CustomerHomeComponent } from './customer/dashboard/customer-dashboard';
// import { AdminDashboardComponent } from './admin/dashboard/admin-dashboard.component';

export const routes: Routes = [

  { path: '', component: LandingComponent },

  { path: 'login', component: CustomerLoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'customer', component: CustomerHomeComponent },


  { path: '**', redirectTo: '' }
];
