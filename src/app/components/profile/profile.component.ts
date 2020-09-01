import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Korisnik } from 'src/app/modules/Korisnik';
import { BookService } from 'src/app/services/book.service';
import { CommentService } from 'src/app/services/comment.service';
import { Komentar } from 'src/app/modules/Komentar';
import { Knjiga } from 'src/app/modules/Knjiga';
import { ActivatedRoute } from '@angular/router'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Output() openBook = new EventEmitter<string>()
  @Input() korisnik: Korisnik


  editDisabled: boolean
  commentsTableColumns: string[]
  booksTableReadColumns: string[]
  booksTableReadingColumns: string[]
  booksTableToReadColumns: string[]

  askedBook: string

  constructor(private data: DataService, private bookService: BookService, private commentService: CommentService) {
    this.editDisabled = true
    this.commentsTableColumns = ['knjigaId', 'komentar', 'ocena', 'zanr']
    this.booksTableReadColumns = ['procitaneKnjige']
    this.booksTableReadingColumns = ['citamKnjige']
    this.booksTableToReadColumns = ['zaCitanjeKnjige']
  }

  ngOnInit(): void {
    this.prikaziKorisnika()
  }

  prikaziKorisnika(): void {
    if (this.korisnik == null)
      this.korisnik = this.data.dohvatiKorisnika()
  }

  promeniPodatke(): void {
    this.editDisabled = !this.editDisabled
  }

  pokupiImenaKnjiga(id: number): string {
    return this.bookService.nadjiKnjiguId(id).naziv
  }

  ukloniSaListeZaCitanje(id: number): void {
    this.korisnik.zaCitanjeKnjige.splice(this.korisnik.zaCitanjeKnjige.findIndex(x => x == id), 1)
    this.data.postaviKorisnika(this.korisnik)
  }

  pokupiKomentare(): Komentar[] {
    return this.commentService.nadjiKorisnikKomentare(this.korisnik)
  }

  pokupiKnjigu(id: number): Knjiga {
    return this.bookService.nadjiKnjiguId(id)
  }

  authenticateUser(): boolean {
    var ulogovaniKorisnik = this.data.dohvatiKorisnika()
    if (this.korisnik.id == ulogovaniKorisnik.id)
      return true
    else return false
  }

  otvoriKnjigu(requestedBook: string): void {
    this.data.changeRequestedBook(requestedBook)
    this.openBook.emit()
  }

}
