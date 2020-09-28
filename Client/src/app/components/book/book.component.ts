import { Component, OnInit, Input } from '@angular/core'
import { Knjiga } from 'src/app/modules/Knjiga'
import { CommentService } from 'src/app/services/comment.service'
import { Komentar } from 'src/app/modules/Komentar'
import { Korisnik } from 'src/app/modules/Korisnik'
import { DataService } from 'src/app/services/data.service'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() ucitanaKnjiga: Knjiga;

  commentsTableData: Array<Komentar>
  commentsTableUserData: Array<any>
  commentsTableColumns: string[]
  ulogovaniKorisnik: Korisnik

  procitao: boolean
  citam: boolean
  zaCitanje: boolean
  showTable: boolean

  ocena: number
  komentar: string

  imageExists: boolean
  path: String

  isReadingBookInfo: Array<any> // [bookId, progressValue, isReading]

  constructor(private commentService: CommentService, private data: DataService, private userService: UserService) {
    this.commentsTableData = []
    this.commentsTableUserData = []
    this.commentsTableColumns = ['korisnikId', 'ocena', 'komentar']
    this.isReadingBookInfo = [0, 0, 0]
    this.imageExists = false
  }

  ngOnInit() {
    this.data.loadedBook.subscribe(book => this.ucitanaKnjiga = book)
    this.path = `API/image?path=${this.ucitanaKnjiga.slika}`
    this.prikaziKjigu()
  }

  // Loads data to display on view
  prikaziKjigu(): void {
    this.ulogovaniKorisnik = this.data.dohvatiKorisnika()

    this.loadToggles()
    this.loadComments()
    this.loadUserComment()
    this.checkImage()
  }

  async checkImage(): Promise<void> {
    if (this.ucitanaKnjiga.slika.length != 0)
      this.imageExists = await this.userService.imageExists(this.ucitanaKnjiga.slika)
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
    })
    if (!loaded)
      this.isReadingBookInfo = [this.ucitanaKnjiga.id, 0, 0]
    this.zaCitanje = this.ulogovaniKorisnik.zaCitanjeKnjige.includes(this.ucitanaKnjiga.id)
  }

  // load comments for currently loaded book
  async loadComments(): Promise<void> {
    this.commentsTableData = await this.commentService.nadjiKnjigaKomentare(this.ucitanaKnjiga)
    this.commentsTableData.forEach( async (obj) => {
      var tempUser = await this.userService.nadjiKorisnikaId(obj.korisnikId)
      this.commentsTableUserData.push(tempUser.korisnickoIme)
    })
    if (this.commentsTableData.length != 0)
      this.showTable = true
    else this.showTable = false
  }

  // load user comment into input fields
  loadUserComment() {
    this.komentar = ""
    this.ocena = 0
    this.commentsTableData.forEach( obj => {
      if (obj.korisnikId == this.ulogovaniKorisnik.id) {
        this.komentar = obj.komentar
        this.ocena = obj.ocena
      }
    })
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
  async nadjiKorisnika(id: string): Promise<string> {
    return (await this.userService.nadjiKorisnikaId(id)).korisnickoIme
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
    //this.userService.sacuvajKorisnika(this.ulogovaniKorisnik)
    this.userService.saveUpdates(this.ulogovaniKorisnik)
    console.log(this.ulogovaniKorisnik)
  }

  async openUserTroughComments(korisnikId: string) {
    this.otvoriKorisnika(korisnikId)
  }

}
