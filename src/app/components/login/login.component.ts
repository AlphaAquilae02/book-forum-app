import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validator } from '../../modules/Validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showErrorMsg:boolean;
  username:string;
  password:string;
  private validator:Validator;

  constructor(private router:Router) { 
    this.showErrorMsg = false;
    this.username = '';
    this.password = '';
    this.validator = new Validator();
  }

  ngOnInit(): void {
  }
  
  login():void {
    var usernameValid:boolean = this.validator.validateUsername(this.username);
    var passwordValid:boolean = this.validator.validatePassword(this.password);
    if ( usernameValid && passwordValid ) {
      this.showErrorMsg = false;
      //call database
    }
    else {
      this.showErrorMsg = true;
    }
    
    console.log('login button clicked');
  }

  register():void {
    this.router.navigate(['/register']);
    console.log('register button clicked');
  }
}
