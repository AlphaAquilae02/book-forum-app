import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() open = new EventEmitter<any>()
  @Output() openSecondary = new EventEmitter<any>()
  @Output() showTable2 = new EventEmitter<boolean>()
  searchParams: Array<string>
  searchObject: string
  linkParam: string
  headerMap: Object

  searchHint: string
  searchResponse: Array<any>
  searchQuery: string
  showTable: boolean


  constructor(private userService: UserService, private bookService: BookService, private data: DataService) { }

  ngOnInit(): void {
    this.data.searchObject.subscribe(obj => this.searchObject = obj)
    this.data.searchParams.subscribe(paramList => this.searchParams = paramList)
    this.data.searchLinkParam.subscribe(linkParam => this.linkParam = linkParam)
    this.data.searchTableHeadersParams.subscribe(headerParams => this.headerMap = headerParams)
    this.showTable = false
    this.searchHint = this.searchParams[0]
  }

  search() {
    switch (this.searchObject) {
      case "knjiga": this.searchResponse = this.bookService.nadjiKnjigu(this.searchHint, this.searchQuery)
        if (this.searchResponse.length == 0)
          this.openSecondary.emit(true)
        break
      case "profil": this.searchResponse = this.userService.nadjiKorisnika(this.searchHint, this.searchQuery)
        break
    }
    if (this.searchResponse.length != 0) {
      this.showTable2.emit(true)
      this.showTable = true
    }
    else {
      this.showTable2.emit(false)
      this.showTable = false
    }
  }

  searchTypeSelect($event) {
    this.searchHint = $event.value
  }

  searchResponseData() {

  }

  openSelected(nesto: string) {
    switch (this.searchObject) {
      case "knjiga": this.data.changeRequestedBook(nesto)
        break
      case "profil": this.data.changeRequestedUser(nesto)
        break
    }
    this.open.emit()
  }
}
