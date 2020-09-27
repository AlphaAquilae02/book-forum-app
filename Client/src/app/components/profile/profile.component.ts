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

  // For user comments display
  userComments: Array<any>
  showUserComments: boolean

  // For user books display
  showUserBooks: boolean
  tableDataArray: Array<Array<any>>
  tableFullData: Array<Array<any>>

  editDisabled: boolean
  commentsTableColumns: string[]
  booksTableReadColumns: string[]
  booksTableReadingColumns: string[]
  booksTableToReadColumns: string[]

  askedBook: string
  editButtonLabel: string

  showEditButton: boolean

  // Variables for listing out books under (read, reading, to be read) tables>
  tableSizeOptions: Array<number>
  tableSizeInitial: number
  tableMaxLength: number

  constructor(private userService: UserService, private data: DataService, private bookService: BookService, private commentService: CommentService) {
    // For user comments display
    this.showUserComments = false

    // For user books display
    this.showUserBooks = false
    this.tableDataArray = [[], [], []]
    this.tableFullData = [[], [], []]

    this.editButtonLabel = "Promeni podatke"
    this.editDisabled = true

    this.commentsTableColumns = ['knjigaId', 'komentar', 'ocena', 'zanr']
    this.booksTableReadColumns = ['procitaneKnjige']
    this.booksTableReadingColumns = ['citamKnjige']
    this.booksTableToReadColumns = ['zaCitanjeKnjige']
    this.tableSizeInitial = 5
    this.tableSizeOptions = [1, 5, 15, 50]

    this.data.loadedUser.subscribe(user => this.korisnik = user)
  }

  ngOnInit() {
    // If korisnik not requested show currently logged user
    if (this.korisnik.id == "0")
      this.korisnik = this.data.dohvatiKorisnika()
    this.loadUserData()
  }

  // full pull everything method for data of currently displayed user
  async loadUserData() {
    this.showUserBooks = false
    this.showUserComments = false
    this.tableDataArray = [[], [], []]

    // populates tableDataArray[0] with read books
    for (var i = 0; i < this.korisnik.procitaneKnjige.length; i++) {
      this.tableDataArray[0].push({
        id: this.korisnik.procitaneKnjige[i],
        naziv: await this.bookService.getBookName(this.korisnik.procitaneKnjige[i])
      })
    }

    // populates tableDataArray[1] with currently reading books
    for (var i = 0; i < this.korisnik.citamKnjige.length; i++) {
      this.tableDataArray[1].push({
        id: this.korisnik.citamKnjige[i][0],
        naziv: await this.bookService.getBookName(this.korisnik.citamKnjige[i][0])
      })
    }

    // populates tableDataArray[2] with books to be read
    for (var i = 0; i < this.korisnik.zaCitanjeKnjige.length; i++) {
      this.tableDataArray[2].push({
        id: this.korisnik.zaCitanjeKnjige[i],
        naziv: await this.bookService.getBookName(this.korisnik.zaCitanjeKnjige[i])
      })
    }

    // copy pulled data into placeholder
    this.tableFullData = this.tableDataArray.slice()

    // sets max number for display on paginator
    this.tableMaxLength = 0
    this.tableDataArray.forEach(element => {
      if (element.length > this.tableMaxLength)
        this.tableMaxLength = element.length
    })

    // populates userComments with user personalized comments
    this.userComments = await this.commentService.getUserComments(this.korisnik.id)

    // display tables after data has been loaded
    this.showUserBooks = true
    this.showUserComments = true

    this.authenticateUser()
  }

  // Method to unlock/lock input fields for user params
  editBtn(): void {
    this.editDisabled = !this.editDisabled
    if (this.editDisabled) {
      this.userService.sacuvajKorisnika(this.korisnik)
      this.editButtonLabel = "Promeni podatke"
    }
    else
      this.editButtonLabel = "Sacuvaj podatke"
  }

  // Method of authentification used to change value on field which controls display of "EDIT" button
  authenticateUser() {
    var ulogovaniKorisnik = this.data.dohvatiKorisnika()
    if (this.korisnik.id == ulogovaniKorisnik.id)
      this.showEditButton = true
    else this.showEditButton = false
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
    this.tableDataArray[0] = this.tableFullData[0].slice(firstCut, secondCut);
    this.tableDataArray[1] = this.tableFullData[1].slice(firstCut, secondCut);
    this.tableDataArray[2] = this.tableFullData[2].slice(firstCut, secondCut);
  }

}
