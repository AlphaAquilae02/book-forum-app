import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-poljoprivrednik',
  templateUrl: './register-poljoprivrednik.component.html',
  styleUrls: ['./register-poljoprivrednik.component.css']
})
export class RegisterPoljoprivrednikComponent implements OnInit {
  ime:string;
  prezime:string;
  korisnickoIme:string;
  lozinka:string;
  datumRodjenja:string;
  mestoRodjenja:string;
  kontaktTelefon:string;
  emailAdresa:string;

  constructor() { }

  ngOnInit(): void {
  }

  register():void {
    console.log('register clicked');
  }

}
