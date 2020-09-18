import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from 'src/app/services/user.service'
import { Korisnik } from 'src/app/modules/Korisnik'
import { ValidatorService } from 'src/app/services/validator.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  siteKey:string
  captchaCheck:boolean
  korisnik:Korisnik

  usernameCheck:boolean
  passwordCheck:boolean
  emailCheck:boolean


  constructor(private router:Router, private userService:UserService, private validatorService: ValidatorService) {
    this.siteKey = "6Le2UcUZAAAAAHKv4dh2moTO_XPyNeDIbb4pY7ew"
    this.captchaCheck = false
    
    this.korisnik = {
      id: 0,
      AT: 1,
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
    }
  }

  ngOnInit(): void {
  }

  register():void {
    console.log(this.korisnik.datumRodjenja)
    this.usernameCheck = this.validatorService.validateUsername(this.korisnik.korisnickoIme)
    this.passwordCheck = this.validatorService.validatePassword(this.korisnik.lozinka)
    this.emailCheck = this.validatorService.validateEmail(this.korisnik.email)
    
    // Odradi prvo provere sve koje su potrebne nad unetim poljima
    if(this.usernameCheck && this.passwordCheck && this.emailCheck) {
      this.userService.dodajKorisnika(this.korisnik)
      this.router.navigate(['/login'])
    }
  }

  back():void {
    this.router.navigate(['/login'])
  }

}
