import { Injectable } from '@angular/core';
import { Korisnik } from '../modules/Korisnik';
import { BehaviorSubject } from 'rxjs';
import { Knjiga } from '../modules/Knjiga';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Holds the authority token of logged user
  private loggedUserATSource = new BehaviorSubject(0)
  loggedUserAT = this.loggedUserATSource.asObservable()

  // Holds the data of requested user after clicking the link to the user
  private requestedUserSource = new BehaviorSubject('')
  requestedUser = this.requestedUserSource.asObservable()

  // Holds the currently loaded(to be displayed) book
  private loadedBookSource = new BehaviorSubject<Knjiga>({
    id: '0',
    slika: '',
    naziv: '',
    autor: [],
    datumIzdavanja: '',
    zanr: [],
    opis: '',
    prosecnaOcena: 0,
    brStrana: 0,
    odobrena: false
  })
  loadedBook = this.loadedBookSource.asObservable()

  // Holds the currently loaded(to be displayed) user
  private loadedUserSource = new BehaviorSubject<Korisnik>({
    id: '0',
    AT: 1,
    ime: '',
    prezime:'',
    slika: '',
    korisnickoIme: '',
    lozinka: '',
    datumRodjenja: '',
    grad: '',
    drzava: '',
    email: '',
    procitaneKnjige: [],
    citamKnjige: [],
    zaCitanjeKnjige: []
  })
  loadedUser = this.loadedUserSource.asObservable()

  // Holds the data of requested book after clicking the link to the book
  private requestedBookSource = new BehaviorSubject('')
  requestedBook = this.requestedBookSource.asObservable()

  // Holds the selected tab index
  // App changes tab in menu on value change 
  private selectedTabSource = new BehaviorSubject(0)
  selectedTab = this.selectedTabSource.asObservable()

  // Holds the data which are to be displayed in table
  private tableDataSource = new BehaviorSubject<Array<any>>([])
  tableData = this.tableDataSource.asObservable()

  // Holds the data which controls if table should be rendered or not
  private showTableSource = new BehaviorSubject<boolean>(false)
  showTable = this.showTableSource.asObservable()

  constructor() {
  }

  /*  Ovde mozda treba da se stavi da kad god se zove ova metoda on odradi refresh na bazi
   *  ali obavezno proveri da li tako da odradis jer bi se to pozvalo i prvi put kada podesavas 
   *  session logged user!   
   */

  setLoggedUserAT(at:number):void {
    this.loggedUserATSource.next(at)
  }

  postaviKorisnika(korisnik: Korisnik): void {
    sessionStorage.setItem('ulogovaniKorisnik', JSON.stringify(korisnik))
    this.updateInitialUserData(korisnik)
    this.loggedUserATSource.next(korisnik.AT)
  }

  dohvatiKorisnika(): Korisnik {
    return JSON.parse(sessionStorage.getItem('ulogovaniKorisnik'));
  }

  updateInitialUserData(updatedOriginal: Korisnik) {
    sessionStorage.setItem('initialUserData', JSON.stringify(updatedOriginal))
  }

  getInitialUserData(): Korisnik {
    return JSON.parse(sessionStorage.getItem('initialUserData'));
  }

  changeRequestedUser(newRequestedUser: string) {
    this.requestedUserSource.next(newRequestedUser)
  }

  changeRequestedBook(newRequestedBook: string) {
    this.requestedBookSource.next(newRequestedBook)
  }

  setLoadedBook(book: Knjiga) {
    this.loadedBookSource.next(book)
  }

  setLoadedUser(user: Korisnik) {
    this.loadedUserSource.next(user)
  }

  changeTab(index: number) {
    this.selectedTabSource.next(index)
  }

  setTableData(params: Array<any>) {
    this.tableDataSource.next(params)
  }

  setShowTable(showTable: boolean) {
    this.showTableSource.next(showTable)
  }
  
  // temp
  getLoadedBook(): Knjiga {
    return this.loadedBookSource.value
  }

}
