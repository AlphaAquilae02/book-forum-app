import { Injectable } from '@angular/core';
import { Korisnik } from '../modules/Korisnik';
import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';

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

  // Holds the data of requested book after clicking the link to the book
  private requestedBookSource = new BehaviorSubject('')
  requestedBook = this.requestedBookSource.asObservable()

  // Holds the selected tab index
  // App changes tab in menu on value change 
  private selectedTabSource = new BehaviorSubject(0)
  selectedTab = this.selectedTabSource.asObservable()

  // Holds the data of which object is requested for search
  private searchObjectSource = new BehaviorSubject('')
  searchObject = this.searchObjectSource.asObservable()

  // Holds the data of params which are to be displayed in table
  private searchParamsSource = new BehaviorSubject<Array<string>>([])
  searchParams = this.searchParamsSource.asObservable()

  // Holds the data which column of table should be rendered as a link
  private searchLinkParamSource = new BehaviorSubject('')
  searchLinkParam = this.searchLinkParamSource.asObservable()

  // Holds the data in object as a form of map to which param should be 
  // represented in which specifically format(namewise)
  private searchTableHeadersParamsSource = new BehaviorSubject<Object>({})
  searchTableHeadersParams = this.searchTableHeadersParamsSource.asObservable()

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
    this.loggedUserATSource.next(korisnik.AT)
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

  setShowTable(showTable: boolean) {
    this.showTableSource.next(showTable)
  }

}
