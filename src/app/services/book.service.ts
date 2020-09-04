import { Injectable } from '@angular/core';
import { Knjiga } from '../modules/Knjiga';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  knjigeLista: Knjiga[]

  constructor() {
    this.fillKnjigeLista()
  }

  // Method to add a book in database
  dodajKnjigu(knjiga: Knjiga): void {
    this.knjigeLista.push(knjiga)
  }

  // Method to find the book based on param 'id'
  nadjiKnjiguId(id: number): Knjiga {
    var bookFound = this.knjigeLista.filter(x => x.id == id)
    if (bookFound.length > 0) {
      return bookFound[0]
    }
    else {
      return null
    }
  }

  // Method to find the book based on param 'naziv'
  nadjiKnjiguNaziv(naziv: string): Knjiga {
    var bookFound = this.knjigeLista.filter(x => x.naziv == naziv)
    if (bookFound.length > 0) 
      return bookFound[0]
    else 
      return null
  }

  // Method returns full list of objects of type 'Knjiga' based on params
  // Returns list of books based on searchQuery where searchQuery matches searchParam.value
  nadjiKnjigu(searchParam: string, searchQuery: string): Array<Knjiga> {
    if (Array.isArray(this.knjigeLista[0][searchParam]))
      return this.knjigeLista.filter(x => x[searchParam].some(element => {
        return (element == searchQuery)
      }))
    else
      return this.knjigeLista.filter(x => x[searchParam] == searchQuery)
  }

  // Temporary method for testing purposes
  fillKnjigeLista(): void {
    this.knjigeLista = [
      {
        id: 1,
        slika: 'asd',
        naziv: 'Na drini cuprija',
        autor: ['Ivo Andric'],
        datumIzdavanja: '01/03/1945',
        zanr: ['Istorija', 'Fikcija'],
        opis: 'bla bla bla',
        prosecnaOcena: 4.5,
        brStrana: 574,
        odobrena: true
      },
      {
        id: 2,
        slika: 'asd',
        naziv: 'The Revenant',
        autor: ['Leo'],
        datumIzdavanja: '01/03/2015',
        zanr: ['Fantastika'],
        opis: 'blu blu blu',
        prosecnaOcena: 4.2,
        brStrana: 300,
        odobrena: true
      },
      {
        id: 3,
        slika: 'asd',
        naziv: 'What If?',
        autor: ['Neka likusa'],
        datumIzdavanja: '01/03/2020',
        zanr: ['Fantastika'],
        opis: 'ble ble ble',
        prosecnaOcena: 3.2,
        brStrana: 800,
        odobrena: false
      },
      {
        id: 4,
        slika: 'asd',
        naziv: 'Avengers',
        autor: ['MARVEL'],
        datumIzdavanja: '01/03/1998',
        zanr: ['Fantastika', 'Fikcija'],
        opis: 'ble ble ble',
        prosecnaOcena: 4.2,
        brStrana: 50,
        odobrena: true
      }
    ]
  }
}
