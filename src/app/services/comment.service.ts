import { Injectable } from '@angular/core';
import { Komentar } from '../modules/Komentar';
import { DataService } from './data.service';
import { Korisnik } from '../modules/Korisnik';
import { Knjiga } from '../modules/Knjiga';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  komentarLista:Komentar[]

  constructor(private data:DataService) {
    this.fillKomentariLista()
  }

  // Method to add a comment in database
  dodajKomentar(korisnikId:number, knjigaId:number, ocena:number, komentar:string):void {
    this.komentarLista.push({
      id: this.komentarLista.length,
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
  izmeniKomentar(komentar:string, ocena:number, korisnikId:number, knjigaId:number):void {
    this.komentarLista.filter(x => x.korisnikId == korisnikId).filter(y => y.knjigaId == knjigaId)[0].komentar = komentar
    this.komentarLista.filter(x => x.korisnikId == korisnikId).filter(y => y.knjigaId == knjigaId)[0].ocena = ocena
  }

  // Method to find the comment in database based on 'user.id' and 'book.id' params
  nadjiKomentar(korisnikId:number, knjigaId:number):Komentar {
    var pronadjeniKomentari = this.komentarLista.filter(x => x.korisnikId == korisnikId).filter(y => y.knjigaId == knjigaId)
    if (pronadjeniKomentari.length > 0) {
      return pronadjeniKomentari[0]
    }
    else return null
  }

  // Method returns full list of comments based on 'user.id' param
  nadjiKorisnikKomentare(korisnik:Korisnik):Komentar[] {
    var pronadjeniKomentari = this.komentarLista.filter(x => x.korisnikId == korisnik.id)
    if (pronadjeniKomentari.length > 0) {
      return pronadjeniKomentari
    }
    else return []
  }

  // Method returns full list of comments based on 'book' param
  nadjiKnjigaKomentare(knjiga:Knjiga):Komentar[] {
    var pronadjeniKomentari = this.komentarLista.filter(x => x.knjigaId == knjiga.id)
    if (pronadjeniKomentari.length > 0) {
      return pronadjeniKomentari
    }
    else return []
  }

  // Temporary method for testing purposes
  fillKomentariLista():void {
    this.komentarLista = [
      {
        id: 1,
        korisnikId: 1,
        knjigaId: 1,
        komentar: 'Evo meni se ova knjiga nije svidela.',
        ocena: 2
      },
      {
        id: 2,
        korisnikId: 2,
        knjigaId: 1,
        komentar: 'Glamorous AF',
        ocena: 4.5
      },
      {
        id: 3,
        korisnikId: 2,
        knjigaId: 2,
        komentar: 'Did not understant a single word, except "SEX".',
        ocena: 5
      },
    ]
  }
}
