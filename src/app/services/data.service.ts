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

  //changes the selected tab in main header thingy
  private selectedTabSource = new BehaviorSubject(0)
  selectedTab = this.selectedTabSource.asObservable()

  private searchObjectSource = new BehaviorSubject('')
  searchObject = this.searchObjectSource.asObservable()

  private searchParamsSource = new BehaviorSubject<Array<string>>([])
  searchParams = this.searchParamsSource.asObservable()

  private searchLinkParamSource = new BehaviorSubject('')
  searchLinkParam = this.searchLinkParamSource.asObservable()

  private searchTableHeadersParamsSource = new BehaviorSubject<Object>({})
  searchTableHeadersParams = this.searchTableHeadersParamsSource.asObservable()

  private tableDataSource = new BehaviorSubject<Array<any>>([])
  tableData = this.tableDataSource.asObservable()

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

  changeTab(index: number) {
    this.selectedTabSource.next(index)
  }

  setSearchObject(object: string) {
    this.searchObjectSource.next(object)
  }

  setSearchParams(params: Array<string>) {
    this.searchParamsSource.next(params)
  }

  setSearchLinkParam(linkParam: string) {
    this.searchLinkParamSource.next(linkParam)
  }

  setSearchTableHeadersParams(headerParams: object) {
    this.searchTableHeadersParamsSource.next(headerParams)
  }

  setTableData(params: Array<any>) {
    this.tableDataSource.next(params)
  }
}
