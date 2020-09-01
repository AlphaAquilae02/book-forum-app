import { Injectable } from '@angular/core';
import { Korisnik } from '../modules/Korisnik';
import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private requestedUserSource = new BehaviorSubject('')
  requestedUser = this.requestedUserSource.asObservable()

  private requestedBookSource = new BehaviorSubject('')
  requestedBook = this.requestedBookSource.asObservable()

  private selectedTabSource = new BehaviorSubject(0)
  selectedTab = this.selectedTabSource.asObservable()

  constructor() {
  }

  /*  Ovde mozda treba da se stavi da kad god se zove ova metoda on odradi refresh na bazi
   *  ali obavezno proveri da li tako da odradis jer bi se to pozvalo i prvi put kada podesavas 
   *  session logged user!   
   */
  postaviKorisnika(korisnik: Korisnik): void {
    sessionStorage.setItem('ulogovaniKorisnik', JSON.stringify(korisnik))
  }

  dohvatiKorisnika(): Korisnik {
    return JSON.parse(sessionStorage.getItem('ulogovaniKorisnik'));
  }

  changeRequestedUser(newRequestedUser: string) {
    this.requestedUserSource.next(newRequestedUser)
  }

  changeRequestedBook(newRequestedBook: string) {
    this.requestedBookSource.next(newRequestedBook)
  }

  changeTab(index:number) {
    this.selectedTabSource.next(index)
  }

}
