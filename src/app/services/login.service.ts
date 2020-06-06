import { Injectable } from '@angular/core';
import { Poljoprivrednik } from '../modules/Poljoprivrednik';
import { Preduzece } from '../modules/Preduzece';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  poljoprivrednikLista:Poljoprivrednik[];
  preduzeceLista:Preduzece[];

  constructor() { 
    this.fillPoloprivredniciLista(); // temp za punjenje
    this.fillPreduzeceLista(); // temp za punjenje
  }



  /* Totalno nebitne metode, privremeno u upotrebi radi pravljenja funkcionalnosti ostatka app */
  fillPoloprivredniciLista():void {
    this.poljoprivrednikLista = [
      {
        id: 1,
        ime: "Milan",
        prezime: "Milovanovic",
        korisnickoIme: "mmilov1234",
        lozinka: "1234",
        datumRodjenja: "18091980",
        mestoRodjenja: "Ivanica",
        kontaktTelefon: 123456789,
        email: "mmilov1234@gmail.com"
      },
      {
        id: 2,
        ime: "Tajler",
        prezime: "Blevins",
        korisnickoIme: "tb1234",
        lozinka: "12345678",
        datumRodjenja: "18021995",
        mestoRodjenja: "Kolorado",
        kontaktTelefon: 12447841,
        email: "tb995@gmail.com"
      }
    ]
  }

  fillPreduzeceLista():void {
    this.preduzeceLista = [
      {
        id: 1,
        naziv: "Milan Plastik",
        korisnickoIme: "MPlast",
        lozinka: "132456789",
        datumOsnivanja: "19031970",
        mesto: "Beograd",
        email: "mplast@gmail.com"
      },
      {
        id: 2,
        naziv: "Tajler Strim",
        korisnickoIme: "Ninja",
        lozinka: "987654321",
        datumOsnivanja: "10052012",
        mesto: "Kalifornija",
        email: "ninja@gmail.com"
      }
    ]
  }

}
