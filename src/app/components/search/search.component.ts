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
  @Input() searchParams: Array<string>
  @Input() searchObject: string
  @Input() linkParam:string
  @Output() open = new EventEmitter<any>()

  searchQuery: string
  searchHint: string
  searchResponse: Array<any>

  showTable: boolean

  constructor(private userService: UserService, private bookService: BookService, private data: DataService) { }

  ngOnInit(): void {
    this.showTable = false
    this.searchHint = this.searchParams[0]
  }

  search() {
    switch (this.searchObject) {
      case "knjiga": this.searchResponse = this.bookService.nadjiKnjigu(this.searchHint, this.searchQuery)
        break
      case "profil": this.searchResponse = this.userService.nadjiKorisnika(this.searchHint, this.searchQuery)
        break
    }
    if (this.searchResponse.length != 0)
      this.showTable = true
  }

  searchTypeSelect($event) {
    this.searchHint = $event.value
  }

  searchResponseData() {

  }

  openSelected(nesto:string) {
    switch (this.searchObject) {
      case "knjiga": this.data.changeRequestedBook(nesto)
        break
      case "profil": this.data.changeRequestedUser(nesto)
        break
    }
    this.open.emit()
  }
}
