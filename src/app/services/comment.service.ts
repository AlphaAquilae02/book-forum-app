import { Injectable } from '@angular/core';
import { Komentar } from '../modules/Komentar';
import { DataService } from './data.service';
import { Korisnik } from '../modules/Korisnik';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  komentarLista:Komentar[]

  constructor(private data:DataService) {
    this.fillKomentariLista()
  }

  dodajKomentar(knjigaId:number, komentar:string):void {

  }

  obrisiKomentar():void {

  }

  izmeniKomentar():void {

  }

  nadjiKorisnikKomentare(korisnik:Korisnik):Komentar[] {
    var pronadjeniKomentari = this.komentarLista.filter(x => x.korisnikId == korisnik.id)
    if (pronadjeniKomentari.length > 0) {
      return pronadjeniKomentari
    }
    else return null
  }

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
