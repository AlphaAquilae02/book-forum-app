import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Table } from 'src/app/modules/Table';
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
  @Input() searchParams: Table

  hintParams: Array<string>

  searchHint: string
  searchResponse: Array<any>
  searchQuery: string


  constructor(private userService: UserService, private bookService: BookService, private data: DataService) { }

  ngOnInit(): void {
    this.searchHint = this.searchParams.searchParams[0]
    this.hintParams = new Array()
    for (let string of this.searchParams.searchParams) 
      this.hintParams.push(string)
    if (this.hintParams[this.hintParams.length - 1] == "button")
      this.hintParams.splice(this.hintParams.length - 1, 1)
  }

  async search() {
    switch (this.searchParams.searchObject) {
      case "knjiga": this.searchResponse = await this.bookService.nadjiKnjigu(this.searchHint, this.searchQuery)
        if (this.searchResponse.length == 0)
          this.showAddOption.emit(true)
        break
      case "profil": this.searchResponse = await this.userService.nadjiKorisnika(this.searchHint, this.searchQuery)
        break
    }
    
    if (this.searchResponse.length != 0) {
      this.data.setTableData(this.searchResponse)
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
