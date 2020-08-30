import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core'
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
  pretraga: string
  ucitanaKnjiga: Knjiga
  commentsTableColumns: string[]
  ulogovaniKorisnik: Korisnik
  procitao: boolean
  cita: boolean
  zaCitanje: boolean
  progressValue: number
  ocena: number
  komentar: string

  @Input() childMessage: string;

  constructor(private commentService: CommentService, private data: DataService, private bookService:BookService, private userService:UserService, private router:Router) {
    this.commentsTableColumns = ['korisnikId', 'ocena', 'komentar']
    this.ulogovaniKorisnik = this.data.dohvatiKorisnika()
    this.progressValue = 0
  }

  ngOnInit(): void {
    this.promeniKnjigu()
    this.initToggles()
    if (this.commentService.nadjiKomentar(this.ulogovaniKorisnik.id, this.ucitanaKnjiga.id) != null) {
      this.komentar = this.commentService.nadjiKomentar(this.ulogovaniKorisnik.id, this.ucitanaKnjiga.id).komentar
      this.ocena = this.commentService.nadjiKomentar(this.ulogovaniKorisnik.id, this.ucitanaKnjiga.id).ocena
    }
  }

  promeniKnjigu():void {
    var temp = this.bookService.nadjiKnjiguNaziv(this.childMessage)
    if (temp != null)
      this.ucitanaKnjiga = temp
  }

  pokupiKomentare(): Komentar[] {
    return this.commentService.nadjiKnjigaKomentare(this.ucitanaKnjiga)
  }

  nadjiKorisnika(id:number):string {
    return this.userService.nadjiKorisnikaId(id).korisnickoIme
  }

  initToggles(): void {
    this.procitao = this.ulogovaniKorisnik.procitaneKnjige.includes(this.ucitanaKnjiga.id)
    this.cita = this.ulogovaniKorisnik.citamKnjige.includes(this.ucitanaKnjiga.id)
    this.zaCitanje = this.ulogovaniKorisnik.zaCitanjeKnjige.includes(this.ucitanaKnjiga.id)
  }

  sacuvajKomentar(): void {
    this.commentService.izmeniKomentar(this.komentar, this.ocena, this.ulogovaniKorisnik.id, this.ucitanaKnjiga.id)
  }

  otvoriKorisnika(korisnickoIme:string): void {
    var URL:string = "profile?username=" + korisnickoIme
    console.log(URL)
    this.router.navigate([URL]);
  }
}
