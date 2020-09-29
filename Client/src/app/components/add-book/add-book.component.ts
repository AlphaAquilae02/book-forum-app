import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Knjiga } from 'src/app/modules/Knjiga';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  knjiga: Knjiga
  autori: string
  zanrovi: string

  autoriHint: string
  zanroviHint: string

  genres: Array<string>
  selectedGenres = new FormControl()
  selectedGenresData: Array<string>

  constructor(private bookService: BookService) {
    this.autori = ""
    this.zanrovi = ""
    this.autoriHint = `Svakog dodatnog autora odvojiti sa ", "`
    this.zanroviHint = `Svaki dodatni zanr odvojiti sa ", "`

    this.genres = []
    this.selectedGenresData = []

    this.knjiga = {
      id: '',
      slika: 'asd',
      naziv: '',
      autor: [],
      datumIzdavanja: '',
      zanr: [],
      opis: '',
      prosecnaOcena: 0,
      brStrana: 0,
      odobrena: false
    }
  }

  async ngOnInit(): Promise<void> {
    this.genres = await this.bookService.getGenres()
  }

  dodajKnjigu(): void {
    this.knjiga.autor = this.autori.split(", ", 10)
    this.knjiga.zanr = this.selectedGenresData
    console.log(this.knjiga.zanr)
    //this.bookService.dodajKnjigu(this.knjiga)
  }

  checkGenres(): void {
    if (this.selectedGenres.value.length <= 3)
      this.selectedGenresData = this.selectedGenres.value;
    else
      this.selectedGenres.setValue(this.selectedGenresData);
  }

}
