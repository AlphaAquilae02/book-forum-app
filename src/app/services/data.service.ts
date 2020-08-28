import { Injectable } from '@angular/core';
import { Korisnik } from '../modules/Korisnik';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() {
  }

  /*  Ovde mozda treba da se stavi da kad god se zove ova metoda on odradi refresh na bazi
   *  ali obavezno proveri da li tako da odradis jer bi se to pozvalo i prvi put kada podesavas 
   *  session logged user! 
   */
  postaviKorisnika(korisnik:Korisnik):void {
    sessionStorage.setItem('ulogovaniKorisnik', JSON.stringify(korisnik))
  }

  dohvatiKorisnika():Korisnik {
    return JSON.parse(sessionStorage.getItem('ulogovaniKorisnik'));
  }

}
