import { Injectable } from '@angular/core';
import { Knjiga } from '../modules/Knjiga';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  knjigeLista:Knjiga[]

  constructor() { 
    this.fillKnjigeLista();
  }

  nadjiKnjigu(id:number):Knjiga {
    var userFound = this.knjigeLista.filter(x => x.id == id)
    if (userFound.length > 0) {
      return userFound[0]
    }
    else {
      return null
    }
  }

  fillKnjigeLista():void {
    this.knjigeLista = [
      {
        id: 1,
        slika: 'asd',
        naziv: 'Na drini cuprija',
        autor: ['Ivo Andric'],
        datumIzdavanja: '01/03/1945',
        zanr: ['Istorija', 'Fikcija'],
        opis: 'bla bla bla',
        prosecnaOcena: 4.5
      },
      {
        id: 2,
        slika: 'asd',
        naziv: 'The Revenant',
        autor: ['Leo'],
        datumIzdavanja: '01/03/2015',
        zanr: ['Fantastika'],
        opis: 'blu blu blu',
        prosecnaOcena: 4.2
      },
      {
        id: 3,
        slika: 'asd',
        naziv: 'What If?',
        autor: ['Neka likusa'],
        datumIzdavanja: '01/03/2020',
        zanr: ['Erotika'],
        opis: 'ble ble ble',
        prosecnaOcena: 3.2
      }
    ]
  }
}
