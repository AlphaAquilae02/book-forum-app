import { Injectable } from '@angular/core';
import { Knjiga } from '../modules/Knjiga';
import axios, { AxiosInstance } from 'axios'

@Injectable({
  providedIn: 'root'
})
export class BookService {
  knjigeLista: Knjiga[]
  axiosRequest: AxiosInstance

  constructor() {
    this.fillKnjigeLista()
    this.axiosRequest = axios.create({
      baseURL: 'http://localhost:5000/',
      timeout: 1000
    })
  }

  async imageExists(path:String): Promise<boolean> {
    var returnBool = false
    await this.axiosRequest.get(`API/image?path=${path}`)
    .then(res => {
      returnBool = (res.status == 200) ? true : false
    })
    .catch(err => {
      console.log(err)
    })
    return returnBool
  }

  // Method to add a book in database
  dodajKnjigu(knjiga: Knjiga): void {
    this.knjigeLista.push(knjiga)
  }

  // Method to find the book based on param 'id'
  async nadjiKnjiguId(id: string): Promise<Knjiga> {
    var tempBook: Knjiga

    await this.axiosRequest.get(`API/books/${id}`)
      .then(response => {
        tempBook = {
          id: response.data[0].id,
          slika: response.data[0].slika,
          naziv: response.data[0].naziv,
          autor: JSON.parse(response.data[0].autor),
          datumIzdavanja: response.data[0].datumIzdavanja,
          zanr: JSON.parse(response.data[0].zanr),
          opis: response.data[0].opis,
          prosecnaOcena: response.data[0].prosecnaOcena,
          brStrana: response.data[0].brStrana,
          odobrena: response.data[0].odobrena
        }
      })
      .catch(err => {
        console.log(err)
      })
    return tempBook
  }

  // Method to find the book based on param 'naziv'
  async nadjiKnjiguNaziv(naziv: string): Promise<Knjiga> {
    var tempBook: Knjiga

    await this.axiosRequest.get(`API/books?naziv=${naziv}`)
      .then(response => {
        tempBook = {
          id: response.data[0].id,
          slika: response.data[0].slika,
          naziv: response.data[0].naziv,
          autor: JSON.parse(response.data[0].autor),
          datumIzdavanja: response.data[0].datumIzdavanja,
          zanr: JSON.parse(response.data[0].zanr),
          opis: response.data[0].opis,
          prosecnaOcena: response.data[0].prosecnaOcena,
          brStrana: response.data[0].brStrana,
          odobrena: response.data[0].odobrena
        }
      })
      .catch(err => {
        console.log(err)
      })
    return tempBook
  }

  // Method returns full list of objects of type 'Knjiga' based on params
  // Returns list of books based on searchQuery where searchQuery matches searchParam.value
  async nadjiKnjigu(searchParam: string, searchQuery: string): Promise<Array<Knjiga>> {

    var tempBookList: Array<any> = []

    await this.axiosRequest.get(`API/books?${searchParam}=${searchQuery}`)
      .then(response => {
        response.data.forEach(element => {
          var tempBook: Knjiga = {
            id: element.id,
            slika: element.slika,
            naziv: element.naziv,
            autor: JSON.parse(element.autor),
            datumIzdavanja: element.datumIzdavanja,
            zanr: JSON.parse(element.autor),
            opis: element.opis,
            prosecnaOcena: element.prosecnaOcena,
            brStrana: element.brStrana,
            odobrena: element.odobrena
          }
          tempBookList.push(tempBook)
        })
      })
      .catch(err => {
        console.log(err)
      })
    return tempBookList
  }

  async getBookName(knjigaId: string): Promise<string> {
    var bookName: string = ""
    await this.axiosRequest.get(`API/books/name/${knjigaId}`)
      .then(response => {
        bookName = response.data.naziv
      })
      .catch(err => {
        console.log(err)
      })
    return bookName
  }

  // Temporary method for testing purposes
  fillKnjigeLista(): void {
    this.knjigeLista = [
      {
        id: '1',
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
        id: '2',
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
        id: '3',
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
        id: '4',
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
