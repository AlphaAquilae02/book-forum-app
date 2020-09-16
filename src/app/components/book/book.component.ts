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
  @Input() ucitanaKnjiga: Knjiga;

  komentari: Array<Komentar>
  commentsTableColumns: string[]
  ulogovaniKorisnik: Korisnik

  procitao: boolean
  zaCitanje: boolean
  showTable: boolean

  ocena: number
  komentar: string

  isReadingBookInfo: Array<number> // [bookId, progressValue, isReading]

  constructor(private commentService: CommentService, private data: DataService, private userService: UserService) {
    this.commentsTableColumns = ['korisnikId', 'ocena', 'komentar']
    this.ulogovaniKorisnik = this.userService.nadjiKorisnikaId(this.data.dohvatiKorisnika().id)
    this.isReadingBookInfo = [0, 0, 0]
  }

  ngOnInit(): void {
    this.data.loadedBook.subscribe(book => this.ucitanaKnjiga = book)
    this.prikaziKjigu()
  }

  // Loads data to display on view
  prikaziKjigu(): void {
    // load toggles
    this.procitao = this.ulogovaniKorisnik.procitaneKnjige.includes(this.ucitanaKnjiga.id)
    var loaded = false
    this.ulogovaniKorisnik.citamKnjige.forEach(element => {
      if (element[0] == this.ucitanaKnjiga.id) {
        this.isReadingBookInfo = element
        loaded = true
      }
    });
    if (!loaded)
      this.isReadingBookInfo = [this.ucitanaKnjiga.id, 0, 0]
    this.zaCitanje = this.ulogovaniKorisnik.zaCitanjeKnjige.includes(this.ucitanaKnjiga.id)

    // load comments for currently loaded book
    this.komentari = this.commentService.nadjiKnjigaKomentare(this.ucitanaKnjiga)
    if (this.komentari.length != 0)
      this.showTable = true
    else this.showTable = false

    // load existing comment into input fields
    if (this.commentService.nadjiKomentar(this.ulogovaniKorisnik.id, this.ucitanaKnjiga.id) != null) {
      this.komentar = this.commentService.nadjiKomentar(this.ulogovaniKorisnik.id, this.ucitanaKnjiga.id).komentar
      this.ocena = this.commentService.nadjiKomentar(this.ulogovaniKorisnik.id, this.ucitanaKnjiga.id).ocena
    }
    else {
      this.komentar = ""
      this.ocena = 0
    }
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
  otvoriKorisnika(requestedUser: string): void {
    this.data.changeRequestedUser(requestedUser)
    this.data.changeTab(2)
  }

  progressUpdated(): void {
    this.toggledCita(this.isReadingBookInfo[2])
  }

  toggledCita(event): void {
    this.isReadingBookInfo[2] = event ? 1 : 0

    // update cita array
    if (this.ulogovaniKorisnik.citamKnjige.length > 0)
      this.ulogovaniKorisnik.citamKnjige.forEach(element => {
        if (element[0] == this.ucitanaKnjiga.id)
          element = this.isReadingBookInfo
      });
    else
      this.ulogovaniKorisnik.citamKnjige.push(this.isReadingBookInfo)

    this.saveChanges()
  }

  toggledZaCitanje(): void {
    // update zaCitanje array
    if (this.ulogovaniKorisnik.zaCitanjeKnjige.length > 0)
      this.ulogovaniKorisnik.zaCitanjeKnjige.forEach(element => {
        if (element == this.ucitanaKnjiga.id) {
          if (!this.zaCitanje)
            this.ulogovaniKorisnik.zaCitanjeKnjige.splice(this.ulogovaniKorisnik.zaCitanjeKnjige.indexOf(element), 1)
        } else
          this.ulogovaniKorisnik.zaCitanjeKnjige.push(this.ucitanaKnjiga.id)
      })
    else
      this.ulogovaniKorisnik.zaCitanjeKnjige.push(this.ucitanaKnjiga.id)

    this.saveChanges()
  }

  toggledProcitao(): void {
    if (this.procitao) {
      this.isReadingBookInfo[1] = this.ucitanaKnjiga.brStrana
      this.toggledCita(false)
      this.zaCitanje = false
      this.toggledZaCitanje()
    }

    // update procitao array
    if (this.ulogovaniKorisnik.procitaneKnjige.length > 0)
      this.ulogovaniKorisnik.procitaneKnjige.forEach(element => {
        if (element == this.ucitanaKnjiga.id) {
          if (!this.zaCitanje)
            this.ulogovaniKorisnik.procitaneKnjige.splice(this.ulogovaniKorisnik.procitaneKnjige.indexOf(element), 1)
        } else
          this.ulogovaniKorisnik.procitaneKnjige.push(this.ucitanaKnjiga.id)
      })
    else
      this.ulogovaniKorisnik.procitaneKnjige.push(this.ucitanaKnjiga.id)

    this.saveChanges()
  }

  saveChanges(): void {
    this.userService.sacuvajKorisnika(this.ulogovaniKorisnik)
    console.log(this.ulogovaniKorisnik)
  }

}
