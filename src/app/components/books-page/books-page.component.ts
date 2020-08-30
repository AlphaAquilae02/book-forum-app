import { Component, OnInit, ViewChild, Directive, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common'
import { BookService } from 'src/app/services/book.service';
import { BookComponent } from '../book/book.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css']
})

export class BooksPageComponent implements OnInit {
  AT: number
  showBook: boolean
  showAddBook: boolean
  searchQuery: string

  @ViewChild(BookComponent) child!: BookComponent;

  constructor(private location: Location, private bookService: BookService, private data:DataService) {
    this.showBook = false
    this.showAddBook = false
  }

  ngOnInit(): void {
    this.AT = this.data.dohvatiKorisnika().AT
  }

  search(): void {
    var temp = this.bookService.nadjiKnjiguNaziv(this.searchQuery)
    if (temp != null) {
      this.showBook = true
      this.showAddBook = false
    }
    else {
      this.showBook = false
      this.showAddBook = true
    }
    if (this.child) 
      if (temp != null) 
        this.child.promeniKnjigu()
    //this.location.go("home?naziv=" + this.searchQuery)
  }
}
