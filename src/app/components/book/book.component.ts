import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Knjiga } from 'src/app/modules/Knjiga'
import { CommentService } from 'src/app/services/comment.service'
import { Komentar } from 'src/app/modules/Komentar'
import { Korisnik } from 'src/app/modules/Korisnik'
import { DataService } from 'src/app/services/data.service'
import { BookService } from 'src/app/services/book.service'
import { UserService } from 'src/app/services/user.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Output() onUserRequest = new EventEmitter<string>()
  @Input() ucitanaKnjiga: Knjiga;

  commentsTableColumns: string[]
  ulogovaniKorisnik: Korisnik

  procitao: boolean
  cita: boolean
  zaCitanje: boolean

  progressValue: number
  ocena: number
  komentar: string

  constructor(private commentService: CommentService, private data: DataService, private bookService: BookService, private userService: UserService, private router: Router) {
    this.commentsTableColumns = ['korisnikId', 'ocena', 'komentar']
    this.ulogovaniKorisnik = this.data.dohvatiKorisnika()
    this.progressValue = 0
  }

  ngOnInit(): void {
    this.prikaziKjigu()
  }

  // Loads data to display on view
  prikaziKjigu(): void {
    this.procitao = this.ulogovaniKorisnik.procitaneKnjige.includes(this.ucitanaKnjiga.id)
    this.cita = this.ulogovaniKorisnik.citamKnjige.includes(this.ucitanaKnjiga.id)
    this.zaCitanje = this.ulogovaniKorisnik.zaCitanjeKnjige.includes(this.ucitanaKnjiga.id)
    if (this.commentService.nadjiKomentar(this.ulogovaniKorisnik.id, this.ucitanaKnjiga.id) != null) {
      this.komentar = this.commentService.nadjiKomentar(this.ulogovaniKorisnik.id, this.ucitanaKnjiga.id).komentar
      this.ocena = this.commentService.nadjiKomentar(this.ulogovaniKorisnik.id, this.ucitanaKnjiga.id).ocena
    }
  }

  // Returns all comments for requested(currently loaded) book
  pokupiKomentare(): Komentar[] {
    return this.commentService.nadjiKnjigaKomentare(this.ucitanaKnjiga)
  }

  // Returns all names based on param id
  nadjiKorisnika(id: number): string {
    return this.userService.nadjiKorisnikaId(id).korisnickoIme
  }

  // Saves freshly edited/added comment
  sacuvajKomentar(): void {
    this.commentService.izmeniKomentar(this.komentar, this.ocena, this.ulogovaniKorisnik.id, this.ucitanaKnjiga.id)
  }

  // Sends username of the users profile to be displayed
  otvoriKorisnika(korisnickoIme: string): void {
    this.onUserRequest.emit(korisnickoIme)
  }


  saveChanges(): void {
    this.ulogovaniKorisnik.zaCitanjeKnjige[this.ulogovaniKorisnik.zaCitanjeKnjige.indexOf(this.ucitanaKnjiga.id)] = 0
    this.userService.sacuvajKorisnika(this.ulogovaniKorisnik)
    console.log(this.ulogovaniKorisnik)
  }
}
