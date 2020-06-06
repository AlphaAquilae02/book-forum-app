import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterPreduzeceComponent } from './components/register-preduzece/register-preduzece.component';
import { RegisterPoljoprivrednikComponent } from './components/register-poljoprivrednik/register-poljoprivrednik.component';
import { PreduzeceComponent } from './components/preduzece/preduzece.component';
import { PoljoprivrednikComponent } from './components/poljoprivrednik/poljoprivrednik.component';
import { LoginChangePasswordComponent } from './components/login-change-password/login-change-password.component';
import { RegisterComponent } from './components/register/register.component';

/* U sustini ovo je URL nastavak na inicijalnih 'localhost:4200/' i poziv komponente koja odgovara trazenoj stranici */
const routes: Routes = [
  {
    path:'' , component: LoginComponent
  },
  {
    path:'change/password' , component: LoginChangePasswordComponent
  },
  {
    path:'change' , redirectTo: '', pathMatch: 'full'
  },
  {
    path:'admin' , component: AdminComponent
  },
  {
    path:'preduzece' , component: PreduzeceComponent
  },
  {
    path:'poljoprivrednik' , component: PoljoprivrednikComponent
  },
  {
    path:'register' , component:RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
