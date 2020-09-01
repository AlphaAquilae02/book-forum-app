import { Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common'
import { BookService } from 'src/app/services/book.service';
import { BookComponent } from '../book/book.component';
import { DataService } from 'src/app/services/data.service';
import { Knjiga } from 'src/app/modules/Knjiga';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css']
})

export class BooksPageComponent implements OnInit, OnDestroy {
  @ViewChild(BookComponent) bookChild: BookComponent
  @Output() goToUser = new EventEmitter<any>()

  requestedBook: string
  ucitanaKnjiga: Knjiga

  AT: number
  showBook: boolean
  showAddBook: boolean
  searchObject: string
  searchParams: Array<string>
  linkParam: string

  constructor(private location: Location, private bookService: BookService, private data: DataService) {
    this.showBook = false
    this.showAddBook = false
    this.searchObject = "knjiga"
    this.searchParams = [
      "naziv", "autor", "zanr"
    ]
    this.linkParam = this.searchParams[0]
  }

  ngOnInit(): void {
    this.data.requestedBook.subscribe(requestedBook => this.requestedBook = requestedBook)
    this.AT = this.data.dohvatiKorisnika().AT
    if (this.requestedBook != "")
      this.openBook()
  }

  ngOnDestroy(): void {
    this.data.changeRequestedBook("")
  }

  openBook(): void {
    this.showBook = true
    this.showAddBook = false
    this.ucitanaKnjiga = this.bookService.nadjiKnjiguNaziv(this.requestedBook)
    if (this.bookChild)
      this.bookChild.prikaziKjigu()
  }

  openProfile() {
    this.goToUser.emit()
  }
}