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
  
  addUserComment(comment: Komentar) : void {

    const fd = new FormData();
    fd.append('data', JSON.stringify(comment));

    this.axiosRequest.post('API/comments', fd)
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })
  }

  async updateUserComment(comment: Komentar, params: Array<string>): Promise<void> {
    var updatedParams: any = {}
    params.forEach( param => {
      updatedParams[param] = comment[param]
    });

    const fd = new FormData();
    fd.append('data', JSON.stringify(updatedParams));

    await this.axiosRequest.put(`API/comments?id=${comment.id}`, fd)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // Method to delete a comment in database
  obrisiKomentar():void {

  }

  // Method to find the comment in database based on 'user.id' and 'book.id' params
  nadjiKomentar(korisnikId:string, knjigaId:string):Komentar {
    var pronadjeniKomentari = this.komentarLista.filter(x => x.korisnikId == korisnikId).filter(y => y.knjigaId == knjigaId)
    if (pronadjeniKomentari.length > 0) {
      return pronadjeniKomentari[0]
    }
    else return null
  }

  // returns full list of comments of specific user
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

  // returns full list of comments of specific book
  async getAllBookComments(knjiga:Knjiga): Promise<Array<Komentar>>{
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
}