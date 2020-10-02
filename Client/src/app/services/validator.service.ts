import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  private usernameRegEx: RegExp
  private emailEgEx: RegExp
  private passwordRegEx: RegExp

  constructor() {
    this.usernameRegEx = new RegExp(/\w{4}/gi) // minimum number of char (8)
    this.emailEgEx = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    this.passwordRegEx = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&*]).{8,32}$/) 
  }

  validateUsername(username: string): boolean {
    return this.usernameRegEx.test(username)
  }

  validatePassword(password: string): boolean {
    return this.passwordRegEx.test(password)
  }

  validateEmail(email: string): boolean {
    return this.emailEgEx.test(email)
  }

}
