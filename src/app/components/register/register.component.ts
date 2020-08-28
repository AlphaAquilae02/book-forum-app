import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Korisnik } from 'src/app/modules/Korisnik';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  korisnik:Korisnik

  constructor(private router:Router, private userService:UserService) {
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
    // Odradi prvo provere sve koje su potrebne nad unetim poljima

    // Nakon provere pozovi servis koji dodaje novog korisnika
    this.userService.dodajKorisnika(this.korisnik)

    console.log('register')
    //console.log(this.service.korisnikLista[this.service.korisnikLista.length - 1])
  }

  back():void {
    this.router.navigate([''])
  }
}
