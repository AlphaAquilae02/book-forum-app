import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

/* U sustini ovo je URL nastavak na inicijalnih 'localhost:4200/' i poziv komponente koja odgovara trazenoj stranici */
const routes: Routes = [
  {
    path:'' , redirectTo: 'login', pathMatch: 'full'
  },
  {
    path:'login' , component: LoginComponent
  },
  {
    path:'change' , redirectTo: 'login', pathMatch: 'full'
  },
  {
    path:'change/password' , component: ChangePasswordComponent
  },
  {
    path:'register' , component:RegisterComponent
  },
  {
    path:'home' , component: HomeComponent
  },
  {
    path:'profile' , component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
