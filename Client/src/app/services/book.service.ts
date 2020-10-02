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

  async getGenres(): Promise<Array<string>> {
    var temp: Array<string> = []
    await this.axiosRequest.get(`API/books/genres/all`)
    .then(res => {
      res.data.forEach(element => {
        temp.push(element)
      });
    })
    .catch(err => {
      console.log(err)
    })
    return temp
  }

  // Method to add a book in database
  dodajKnjigu(knjiga: Knjiga, file: File): void {
    console.log("dodata")

    const fd = new FormData();
    
    const ext = file.name.split('.').slice(-1)[0];
    fd.append('image', file, `${knjiga.naziv}.${ext}`);
    fd.append('data', JSON.stringify(knjiga));

    this.axiosRequest.post('API/books', fd)
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })
  }

  addMultiple(file: File): void {
    const fd = new FormData();
    fd.append('file', file);

    this.axiosRequest.post('API/books/multiple', fd)
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })
  }

  updateBook(book: Knjiga, params: Array<string>): void {
    var updatedParams: any = {}
    params.forEach( param => {
      updatedParams[param] = book[param]
    });

    const fd = new FormData();
    fd.append('data', JSON.stringify(updatedParams));

    this.axiosRequest.put(`API/books?id=${book.id}`, fd)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
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
            zanr: JSON.parse(element.zanr),
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
}
