import { Injectable } from '@angular/core';
import { Komentar } from '../modules/Komentar';
import { DataService } from './data.service';
import { Korisnik } from '../modules/Korisnik';
import { Knjiga } from '../modules/Knjiga';
import axios, { AxiosInstance } from 'axios'

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  komentarLista:Komentar[]
  axiosRequest: AxiosInstance

  constructor(private data:DataService) {
    this.fillKomentariLista()
    this.axiosRequest = axios.create({
      baseURL: 'http://localhost:5000/',
      timeout: 1000
    })
  }

  // Method to add a comment in database
  dodajKomentar(korisnikId:string, knjigaId:string, ocena:number, komentar:string):void {
    this.komentarLista.push({
      id: '',
      korisnikId: korisnikId,
      knjigaId: knjigaId,
      komentar: komentar,
      ocena: ocena
    })
  }

  // Method to delete a comment in database
  obrisiKomentar():void {

  }

  // Method to edit a comment in database
  izmeniKomentar(komentar:string, ocena:number, korisnikId:string, knjigaId:string):void {
    this.komentarLista.filter(x => x.korisnikId == korisnikId).filter(y => y.knjigaId == knjigaId)[0].komentar = komentar
    this.komentarLista.filter(x => x.korisnikId == korisnikId).filter(y => y.knjigaId == knjigaId)[0].ocena = ocena
  }

  // Method to find the comment in database based on 'user.id' and 'book.id' params
  nadjiKomentar(korisnikId:string, knjigaId:string):Komentar {
    var pronadjeniKomentari = this.komentarLista.filter(x => x.korisnikId == korisnikId).filter(y => y.knjigaId == knjigaId)
    if (pronadjeniKomentari.length > 0) {
      return pronadjeniKomentari[0]
    }
    else return null
  }

  // Method returns full list of comments based on 'user.id' param
  async nadjiKorisnikKomentare(korisnik:Korisnik): Promise<Array<Komentar>> {
    var tempCommentsList: Array<Komentar> = []

    await this.axiosRequest.get(`API/comments?korisnikId=${korisnik.id}`)
      .then(response => {
          response.data.forEach(element => {
          tempCommentsList.push(element)
        });
      })
      .catch(err => {
        console.log(err)
      })
    return tempCommentsList
  }

  async getUserComments(korisnikId: string): Promise<Array<any>> {
    let userComments: Array<any> = []
    await this.axiosRequest.get(`API/comments/${korisnikId}`)
    .then( response => {
      userComments = response.data
    })
    .catch(err => {
      console.log(err)
    })
    return userComments
  }

  // Method returns full list of comments based on 'book' param
  async nadjiKnjigaKomentare(knjiga:Knjiga): Promise<Array<Komentar>>{

    var tempCommentsList: Array<any> = []

    await this.axiosRequest.get(`API/comments?knjigaId=${knjiga.id}`)
      .then(response => {
          response.data.forEach(element => {
          tempCommentsList.push(element)
        });
      })
      .catch(err => {
        console.log(err)
      })
      return tempCommentsList
  }

  // Temporary method for testing purposes
  fillKomentariLista():void {
    this.komentarLista = [
      {
        id: '1',
        korisnikId: '1',
        knjigaId: '1',
        komentar: 'Evo meni se ova knjiga nije svidela.',
        ocena: 2
      },
      {
        id: '2',
        korisnikId: '2',
        knjigaId: '1',
        komentar: 'Glamorous AF',
        ocena: 4.5
      },
      {
        id: '3',
        korisnikId: '2',
        knjigaId: '2',
        komentar: 'Did not understant a single word, except "SEX".',
        ocena: 5
      },
    ]
  }
}
