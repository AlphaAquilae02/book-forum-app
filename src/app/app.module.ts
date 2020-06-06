import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { PreduzeceComponent } from './components/preduzece/preduzece.component';
import { PoljoprivrednikComponent } from './components/poljoprivrednik/poljoprivrednik.component';
import { RegisterPoljoprivrednikComponent } from './components/register-poljoprivrednik/register-poljoprivrednik.component';
import { RegisterPreduzeceComponent } from './components/register-preduzece/register-preduzece.component';
import { LoginChangePasswordComponent } from './components/login-change-password/login-change-password.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    PreduzeceComponent,
    PoljoprivrednikComponent,
    RegisterPoljoprivrednikComponent,
    RegisterPreduzeceComponent,
    LoginChangePasswordComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
