import { Injectable } from '@angular/core';
import { Korisnik } from '../modules/Korisnik';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  korisnikLista:Korisnik[]

  constructor(private data:DataService) { 
    this.fillPreduzeceLista() // temp za punjenje
  }

  dodajKorisnika(korisnik:Korisnik):void {
    this.korisnikLista.push(korisnik)
  }

  obrisiKorisnika(korisnik:Korisnik):void {
    var index = this.korisnikLista.indexOf(korisnik)
    this.korisnikLista.splice(index, 1)
  }

  nadjiKorisnika(username:string):Korisnik {
    return this.korisnikLista.filter(x => x.korisnickoIme == username)[0]
  }

  nadjiKorisnikaId(id:number):Korisnik {
    return this.korisnikLista.filter(x => x.id == id)[0]
  }

  korisnikLogIn(username:string, password:string):boolean {
    var userFound = this.korisnikLista.filter(x => x.korisnickoIme == username && x.lozinka == password)
    if (userFound.length > 0) {
      this.data.postaviKorisnika(userFound[0])
      console.log('User ' + username + ' found! ')
      return true
    }
    else {
      console.log('User ' + username + ' does not exists!')
      return false
    }
  }

  /* Totalno nebitne metode, privremeno u upotrebi radi pravljenja funkcionalnosti ostatka app */
  fillPreduzeceLista():void {
    this.korisnikLista = [
      {
        id: 1,
        AT: 1,
        ime: 'Dusan',
        prezime:' Tomanic',
        slika: 'nah',
        korisnickoIme: 'tduca998',
        lozinka: '1234',
        datumRodjenja: '11/02/1998',
        grad: 'Stara Pazova',
        drzava: 'Srbija',
        email: 'tduca998@gmail.com',
        procitaneKnjige: [],
        citamKnjige: [1, 3],
        zaCitanjeKnjige: []
      },
      {
        id: 2,
        AT: 2,
        ime: 'Rory',
        prezime:' Wolk',
        slika: 'gay',
        korisnickoIme: 'rorynius',
        lozinka: 'asd',
        datumRodjenja: '20/05/1970',
        grad: 'San Francisco',
        drzava: 'USA',
        email: 'rory@wolk.com',
        procitaneKnjige: [2, 3],
        citamKnjige: [1],
        zaCitanjeKnjige: [1]
      }
    ]
  }

}