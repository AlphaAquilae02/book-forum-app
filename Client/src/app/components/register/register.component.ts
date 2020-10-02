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
  siteKey: string
  captchaCheck: boolean
  korisnik: Korisnik

  usernameCheck: boolean
  passwordCheck: boolean
  emailCheck: boolean

  file = null;

  constructor(private router: Router, private userService: UserService, private validatorService: ValidatorService) {
    this.siteKey = "6Le2UcUZAAAAAHKv4dh2moTO_XPyNeDIbb4pY7ew"
    this.captchaCheck = false

    this.korisnik = {
      id: '0', // nije bitno sta se salje jer server kreira id
      AT: 0, // mora da se salje 0 jer je to podrazumevana vrednost autorization tokena
      ime: '',
      prezime: '',
      slika: '', // implementirano kao string koji je u sustini path sa servera
      korisnickoIme: '',
      lozinka: '',
      datumRodjenja: '',
      grad: '',
      drzava: '',
      email: '',
      procitaneKnjige: [], // salje se prazno !
      citamKnjige: [], // salje se prazno !
      zaCitanjeKnjige: [] // salje se prazno !
    }
  }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    this.file = <File>event.target.files[0];
  }

  // Ovde menjaj, radi sta hoces
  // Slika nek se cuva u nekom folderu, nije bitno kako ti namestis ja cu lagano promeniti path
  // Ime slike mora da bude 'username.format'
  // this.korisnik.slika u sustini ne mora nista da ima, obrisacu taj parametar kasnije
  // async register(): Promise<void> {

  //   this.userService.dodajKorisnika(this.korisnik, this.file)
  //   this.router.navigate(['/login'])
  // }


  register():void {
    this.usernameCheck = this.validatorService.validateUsername(this.korisnik.korisnickoIme)
    this.passwordCheck = this.validatorService.validatePassword(this.korisnik.lozinka)
    this.emailCheck = this.validatorService.validateEmail(this.korisnik.email)

    // input validation
    if(this.usernameCheck && this.passwordCheck && this.emailCheck) {
      this.userService.dodajKorisnika(this.korisnik, this.file)
      this.router.navigate(['/login'])
    }
  }

  back(): void {
    this.router.navigate(['/login'])
  }

}
