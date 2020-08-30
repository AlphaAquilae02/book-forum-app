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
    this.passwordRegEx = new RegExp(/\w{8}/gi) 
  }

  validateUsername(username: string): boolean {
    if (username.search(this.usernameRegEx) == 0) return true;
    else return false;
  }

  validatePassword(password: string): boolean {
    return true;
  }

  validateEmail(email: string): boolean {
    if (email.search(this.emailEgEx) == 0) return true;
    else return false;
  }

}
