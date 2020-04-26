import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CustomerComponent } from './views/customer/customer.component';
import { AddComponent } from './views/customer/add/add.component';

const routes: Routes = [
  {path : '', component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'login', component : LoginComponent},
  {path : 'profile', component : ProfileComponent, canActivate : [AuthGuardService]},
  {path : 'dashboard', component : DashboardComponent, canActivate : [AuthGuardService]},
  {path : 'customer', children:[
    {path : '', component : CustomerComponent},
    {path : 'add', component : AddComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
