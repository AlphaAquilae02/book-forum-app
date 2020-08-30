import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DataService } from 'src/app/services/data.service';
import { ValidatorService } from 'src/app/services/validator.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string
  password:string

  constructor(private router:Router, private userService:UserService, private data:DataService,
    private validatorService: ValidatorService) { 
    this.username = ''
    this.password = ''
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
    if (this.validatorService.validateUsername(this.username) && this.validatorService.validatePassword(this.password) ) {
      userFound = this.userService.korisnikLogIn(this.username, this.password)
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
