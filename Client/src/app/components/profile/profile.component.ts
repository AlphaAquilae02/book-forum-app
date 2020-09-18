import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Korisnik } from 'src/app/modules/Korisnik';
import { BookService } from 'src/app/services/book.service';
import { CommentService } from 'src/app/services/comment.service';
import { Komentar } from 'src/app/modules/Komentar';
import { Knjiga } from 'src/app/modules/Knjiga';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() korisnik: Korisnik

  editDisabled: boolean
  commentsTableColumns: string[]
  booksTableReadColumns: string[]
  booksTableReadingColumns: string[]
  booksTableToReadColumns: string[]

  askedBook: string
  editButtonLabel: string

  // Variables for listing out books under (read, reading, to be read) tables
  tableDataArray: Array<Array<any>>
  tableSizeOptions: Array<number>
  tableSizeInitial: number
  tableMaxLength: number

  constructor(private userService: UserService, private data: DataService, private bookService: BookService, private commentService: CommentService) {
    this.editButtonLabel = "Promeni podatke"
    this.editDisabled = true
    this.commentsTableColumns = ['knjigaId', 'komentar', 'ocena', 'zanr']
    this.booksTableReadColumns = ['procitaneKnjige']
    this.booksTableReadingColumns = ['citamKnjige']
    this.booksTableToReadColumns = ['zaCitanjeKnjige']
    this.tableSizeInitial = 5
    this.tableSizeOptions = [1, 5, 15, 50]
  }

  ngOnInit(): void {
    this.data.loadedUser.subscribe(user => this.korisnik = user)
    this.prikaziKorisnika()
  }

  prikaziKorisnika(): void {
    this.tableDataArray = [this.korisnik.procitaneKnjige, this.korisnik.citamKnjige, this.korisnik.zaCitanjeKnjige]
    this.tableDataArray[1] = this.tableDataArray[1].filter(element => element[2] == 1)

    this.tableMaxLength = 0
    this.tableDataArray.forEach(element => {
      if (element.length > this.tableMaxLength)
        this.tableMaxLength = element.length
    });
  }

  // Method to unlock/lock input fields for user params
  promeniPodatke(): void {
    this.editDisabled = !this.editDisabled
    if (this.editDisabled) 
      this.editButtonLabel = "Promeni podatke"
    else 
      this.editButtonLabel = "Sacuvaj podatke"
  }

  //
  pokupiKomentare(): Komentar[] {
    return this.commentService.nadjiKorisnikKomentare(this.korisnik)
  }

  //
  pokupiKnjigu(id: number): Knjiga {
    return this.bookService.nadjiKnjiguId(id)
  }

  // Method of authentification used to change value on field which controls display of "EDIT" button
  authenticateUser(): boolean {
    var ulogovaniKorisnik = this.data.dohvatiKorisnika()
    if (this.korisnik.id == ulogovaniKorisnik.id)
      return true
    else return false
  }

  // Method to be called upon clicking on book name link
  otvoriKnjigu(requestedBook: string): void {
    this.data.changeRequestedBook(requestedBook)
    this.data.changeTab(0)
  }

  // Method of pagination event change used to update shown data in table
  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.tableDataArray[0] = this.korisnik.procitaneKnjige.slice(firstCut, secondCut);
    this.tableDataArray[1] = this.korisnik.citamKnjige.slice(firstCut, secondCut);
    this.tableDataArray[2] = this.korisnik.zaCitanjeKnjige.slice(firstCut, secondCut);
  }

}
