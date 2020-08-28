import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validator } from '../../modules/Validator';
import { UserService } from 'src/app/services/user.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showErrorMsg:boolean
  username:string
  password:string
  private validator:Validator

  constructor(private router:Router, private userService:UserService, private data:DataService) { 
    this.showErrorMsg = false
    this.username = ''
    this.password = ''
    this.validator = new Validator()
  }

  ngOnInit(): void {
    this.data.postaviKorisnika({
      id: 0,
      AT: 0,
      ime: '',
      prezime:' ',
      slika: '',
      korisnickoIme: '',
      lozinka: '',
      datumRodjenja: '',
      grad: '',
      drzava: '',
      email: '', 
      procitaneKnjige: [],
      citamKnjige: [],
      zaCitanjeKnjige: []
    });
  }
  
  login():void {
    var userFound:boolean = false
    if ( this.validator.validateUsername(this.username) && this.validator.validatePassword(this.password) ) {
      this.showErrorMsg = false;
      userFound = this.userService.nadjiKorisnika(this.username, this.password)
    }
    else {
      this.showErrorMsg = true;
    }
    
    if (userFound) {
      this.router.navigate(['/home'])
    }
    console.log('login button clicked');
  }

  changePassword():void {
    this.router.navigate(['/change/password']);
  }

  register():void {
    this.router.navigate(['/register']);
    console.log('register button clicked');
  }

  guest():void {
    this.router.navigate(['/home']);
    console.log('guest entry');
  }
}
