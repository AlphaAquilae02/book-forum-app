import { Component, OnInit, ViewChild, Directive, AfterViewInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
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
  @ViewChild(BookComponent) child!: BookComponent
  @Input() requestedBook: string
  @Output() onDestroy = new EventEmitter<any>()
  @Output() goToUser = new EventEmitter<any>()

  AT: number
  showBook: boolean
  showAddBook: boolean
  searchQuery: string
  ucitanaKnjiga: Knjiga

  constructor(private location: Location, private bookService: BookService, private data: DataService) {
    this.showBook = false
    this.showAddBook = false
  }

  ngOnInit(): void {
    this.AT = this.data.dohvatiKorisnika().AT
    if (this.requestedBook != undefined) 
      this.search(this.requestedBook)
  }

  ngOnDestroy(): void {
    this.onDestroy.emit()
  }

  // Triggered when user submits searchQuery or when parent calls from profile.component
  search(query: string): void {
    var temp = this.bookService.nadjiKnjiguNaziv(query)
    if (temp != null) {
      this.showBook = true
      this.showAddBook = false
      this.ucitanaKnjiga = temp
      if (this.child)
        this.child.prikaziKjigu()
    }
    else {
      this.showBook = false
      this.showAddBook = true
    }
    //this.location.go("home?naziv=" + this.searchQuery)
  }

  // Data sent from book username->$event
  requestedUser($event) {
    this.goToUser.emit($event)
  }
}
