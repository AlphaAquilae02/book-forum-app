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
  citam: boolean
  zaCitanje: boolean
  showTable: boolean

  ocena: number
  komentar: string

  isReadingBookInfo: Array<number> // [bookId, progressValue, isReading]

  constructor(private commentService: CommentService, private data: DataService, private userService: UserService) {
    this.commentsTableColumns = ['korisnikId', 'ocena', 'komentar']
    this.isReadingBookInfo = [0, 0, 0]
  }

  ngOnInit(): void {
    this.ulogovaniKorisnik = this.userService.nadjiKorisnikaId(this.data.dohvatiKorisnika().id)
    if (this.ulogovaniKorisnik == undefined)
      this.ulogovaniKorisnik = this.data.dohvatiKorisnika()

    this.data.loadedBook.subscribe(book => this.ucitanaKnjiga = book)
    console.log(this.userService.nadjiKorisnikaId(this.data.dohvatiKorisnika().id))
    this.prikaziKjigu()
  }

  // Loads data to display on view
  prikaziKjigu(): void {
    this.loadToggles()
    this.loadComments()
    this.loadUserComment()
  }

  // load toggles
  loadToggles() {
    this.procitao = this.ulogovaniKorisnik.procitaneKnjige.includes(this.ucitanaKnjiga.id)
    this.citam = false
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
  }

  // load comments for currently loaded book
  loadComments() {
    this.komentari = this.commentService.nadjiKnjigaKomentare(this.ucitanaKnjiga)
    if (this.komentari.length != 0)
      this.showTable = true
    else this.showTable = false
  }

  // load user comment into input fields
  loadUserComment() {
    if (this.commentService.nadjiKomentar(this.ulogovaniKorisnik.id, this.ucitanaKnjiga.id) != null) {
      this.komentar = this.commentService.nadjiKomentar(this.ulogovaniKorisnik.id, this.ucitanaKnjiga.id).komentar
      this.ocena = this.commentService.nadjiKomentar(this.ulogovaniKorisnik.id, this.ucitanaKnjiga.id).ocena
    }
    else {
      this.komentar = ""
      this.ocena = 0
    }
  }

  // Saves freshly edited/added comment
  saveUserComment(): void {
    if (this.commentService.nadjiKomentar(this.ulogovaniKorisnik.id, this.ucitanaKnjiga.id) != null)
      this.commentService.izmeniKomentar(this.komentar, this.ocena, this.ulogovaniKorisnik.id, this.ucitanaKnjiga.id)
    else 
      this.commentService.dodajKomentar(this.ulogovaniKorisnik.id, this.ucitanaKnjiga.id, this.ocena, this.komentar)
    this.loadComments()
  }

  // Returns all names based on param id
  nadjiKorisnika(id: number): string {
    return this.userService.nadjiKorisnikaId(id).korisnickoIme
  }

  // Sends username of the users profile to be displayed
  otvoriKorisnika(requestedUser: string): void {
    this.data.changeRequestedUser(requestedUser)
    this.data.changeTab(2)
  }

  // triggers on progressValueChange
  progressUpdated(): void {
    this.toggledCita(this.isReadingBookInfo[2], true)
  }

  toggledCita(event, save:boolean): void {
    this.isReadingBookInfo[2] = event ? 1 : 0
    if (event) {
      this.citam = true
      this.zaCitanje = false
      this.toggledZaCitanje(false)
    }

    // update cita array
    var match = false
    if (this.ulogovaniKorisnik.citamKnjige.length > 0)
      this.ulogovaniKorisnik.citamKnjige.forEach(element => {
        if (element[0] == this.ucitanaKnjiga.id) {
          match = true
          element = this.isReadingBookInfo
        }
      });
    if (!match)
      this.ulogovaniKorisnik.citamKnjige.push(this.isReadingBookInfo)

      if (save) this.saveChanges()
  }

  toggledZaCitanje(save: boolean): void {
    // update zaCitanje array
    var match = false
    if (this.ulogovaniKorisnik.zaCitanjeKnjige.length > 0)
      this.ulogovaniKorisnik.zaCitanjeKnjige.forEach(element => {
        if (element == this.ucitanaKnjiga.id) {
          match = true
          if (!this.zaCitanje)
            this.ulogovaniKorisnik.zaCitanjeKnjige.splice(this.ulogovaniKorisnik.zaCitanjeKnjige.indexOf(element), 1)
        }
      })
    if (!match)
      this.ulogovaniKorisnik.zaCitanjeKnjige.push(this.ucitanaKnjiga.id)

    if (save) this.saveChanges()
  }

  toggledProcitao(): void {
    this.isReadingBookInfo[1] = this.ucitanaKnjiga.brStrana
    this.toggledCita(false, false)
    if (this.procitao)
      this.citam = true
    this.zaCitanje = false
    this.toggledZaCitanje(false)


    // update procitao array
    var match = false
    if (this.ulogovaniKorisnik.procitaneKnjige.length > 0)
      this.ulogovaniKorisnik.procitaneKnjige.forEach(element => {
        if (element == this.ucitanaKnjiga.id)
          match = true
      })
    if (!match) {
      this.ulogovaniKorisnik.procitaneKnjige.push(this.ucitanaKnjiga.id)
    }

    this.saveChanges()
  }

  saveChanges(): void {
    this.userService.sacuvajKorisnika(this.ulogovaniKorisnik)
    console.log(this.ulogovaniKorisnik)
  }

}
