import { Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common'
import { BookService } from 'src/app/services/book.service';
import { BookComponent } from '../book/book.component';
import { DataService } from 'src/app/services/data.service';
import { Knjiga } from 'src/app/modules/Knjiga';
import { Table } from 'src/app/modules/Table';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css']
})

export class BooksPageComponent implements OnInit, OnDestroy {
  @ViewChild(BookComponent) bookChild: BookComponent

  requestedBook: string
  ucitanaKnjiga: Knjiga

  AT: number
  showBook: boolean
  showAddBook: boolean

  showBooksTableParams: Table
  showBooksTable: boolean

  constructor(private location: Location, private bookService: BookService, private data: DataService, private userService: UserService) {
    this.showBook = false
    this.showAddBook = false
  }

  // Ova implementacija radi za dugme, i to radi odlicno! Jedino ima problem kod search param choice
  ngOnInit(): void {
    this.showBooksTableParams = {
      searchObject: "knjiga", 
      searchParams: ["naziv", "autor", "zanr", "button"], 
      linkParam: "naziv", 
      tableData: [],
      headerMap: { 
        naziv: "Naziv",
        autor: "Autor",
        zanr: "Zanr",
        button: ""
      },
      buttonLabel: "Odobri"
    }
    this.data.tableData.subscribe(tableData => this.showBooksTableParams.tableData = tableData)
    this.data.setShowTable(false)
    this.data.showTable.subscribe(showTable => this.showBooksTable = showTable)
    
    this.data.requestedBook.subscribe(requestedBook => this.requestedBook = requestedBook)
    this.data.loggedUserAT.subscribe(AT => this.AT = AT)
    if (this.requestedBook != "")
      this.openBook()
  }

  ngOnDestroy(): void {
    this.data.changeRequestedBook("")
    this.data.setTableData([])
  }

  async openBook(): Promise<void> {
    this.data.setLoadedBook( await this.bookService.nadjiKnjiguId(this.requestedBook))
    this.showBook = true
    this.showAddBook = false
    if (this.bookChild)
      this.bookChild.prikaziKjigu()
  }

  openAddBook(show:boolean) {
    this.showAddBook = show
  }

  async dodajKnjige() {
    // testing purposes
    //this.userService.saveUpdates( await this.userService.nadjiKorisnikaId("63e83b8d-55bf-477d-909f-410273e77f04"))
    //this.userService.updateUser(this.data.dohvatiKorisnika(), ['ime', 'prezime'])

    // ovde stavi input pa da on kada stavi bude json pa da se to salje tamo i da se doda u bazu takav json file :3 
    console.log("Dodaj knjige")
  }

  async odobriKnjige() {
    this.data.setTableData( await this.bookService.nadjiKnjigu('odobrena', '0'))
    this.data.setShowTable(true)
    console.log("Odobri knjige")
  }
  
}
