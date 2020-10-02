import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Knjiga } from 'src/app/modules/Knjiga';
import { BookService } from 'src/app/services/book.service';
import * as moment from 'moment'
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  @Input() bookToBeEdited: Knjiga 

  knjiga: Knjiga
  autori: string
  zanrovi: string
  datum: string

  autoriHint: string
  zanroviHint: string

  genres: Array<string>
  selectedGenres = new FormControl()
  selectedGenresData: Array<string>

  file = null

  constructor(private bookService: BookService, private data: DataService) {
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
    if (this.bookToBeEdited != undefined) {
      this.knjiga = this.bookToBeEdited
      this.knjiga.autor.forEach( string => {
        this.autori = this.autori.concat(`${string}, `)
      })
      this.selectedGenres = new FormControl(this.knjiga.zanr)
    }
    this.datum = "" + moment(this.knjiga.datumIzdavanja).format("YYYY-MM-DD")
    console.log(this.datum)
    console.log(this.knjiga.datumIzdavanja)
    this.genres = await this.bookService.getGenres()
  }

  onFileSelected(event) {
    if ("jpeg" || "jpg" || "png" === (<string>(<File>event.target.files[0]).type).substr((<string>(<File>event.target.files[0]).type).indexOf("/")+1, (<string>(<File>event.target.files[0]).type).length-(<string>(<File>event.target.files[0]).type).indexOf("/")-1))
      this.file = <File>event.target.files[0];
  }

  dodajKnjigu(): void {
    this.knjiga.autor = this.autori.split(", ", 10)
    this.knjiga.zanr = this.selectedGenresData
    this.knjiga.datumIzdavanja = moment(this.datum).format("YYYY-MM-DD")
    
    this.bookService.dodajKnjigu(this.knjiga, this.file)
    this.data.changeTab(2)
  }

  checkGenres(): void {
    if (this.selectedGenres.value.length <= 3)
      this.selectedGenresData = this.selectedGenres.value;
    else
      this.selectedGenres.setValue(this.selectedGenresData);
  }

}
