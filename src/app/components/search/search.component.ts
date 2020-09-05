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
  @Output() showAddOption = new EventEmitter<any>()
  searchParams: Array<string>
  hintParams: Array<string>
  searchObject: string
  linkParam: string
  headerMap: Object

  searchHint: string
  searchResponse: Array<any>
  searchQuery: string


  constructor(private userService: UserService, private bookService: BookService, private data: DataService) { }

  ngOnInit(): void {
    this.data.searchObject.subscribe(obj => this.searchObject = obj)
    this.data.searchParams.subscribe(paramList => this.searchParams = paramList)
    this.data.searchLinkParam.subscribe(linkParam => this.linkParam = linkParam)
    this.data.searchTableHeadersParams.subscribe(headerParams => this.headerMap = headerParams)
    this.searchHint = this.searchParams[0]
    this.hintParams = new Array()
    for (let string of this.searchParams) 
      this.hintParams.push(string)
    if (this.hintParams[this.hintParams.length - 1] == "button")
      this.hintParams.splice(this.hintParams.length - 1, 1)
  }

  search() {
    switch (this.searchObject) {
      case "knjiga": this.searchResponse = this.bookService.nadjiKnjigu(this.searchHint, this.searchQuery)
        if (this.searchResponse.length == 0)
          this.showAddOption.emit(true)
        break
      case "profil": this.searchResponse = this.userService.nadjiKorisnika(this.searchHint, this.searchQuery)
        break
    }
    this.data.setTableData(this.searchResponse)
    if (this.searchResponse.length != 0) {
      this.data.setShowTable(true)
    }
    else {
      this.data.setShowTable(false)
    }
  }

  searchTypeSelect($event) {
    this.searchHint = $event.value
  }

  searchResponseData() {

  }
}
