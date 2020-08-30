import { Component, OnInit } from '@angular/core';
import { Knjiga } from 'src/app/modules/Knjiga';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  knjiga:Knjiga

  constructor(private bookService:BookService) {
    this.knjiga = {
      id: 1,
      slika: 'asd',
      naziv: '',
      autor: [''],
      datumIzdavanja: '',
      zanr: ['', ''],
      opis: '',
      prosecnaOcena: 0,
      brStrana: 0,
      odobrena: false
    }
   }

  ngOnInit(): void {
    
  }

  dodajKnjigu():void {
    this.bookService.dodajKnjigu(this.knjiga)
  }

}
