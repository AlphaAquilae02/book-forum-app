import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Output() linkClick = new EventEmitter()

  searchObject: string
  searchParams: Array<string>
  linkParam: string
  tableData: Array<any>
  headerMap: Object
  showTable: boolean
  buttonLabel: string
  AT: number

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.searchObject.subscribe(obj => this.searchObject = obj)
    this.data.searchParams.subscribe(paramList => this.searchParams = paramList)
    this.data.searchLinkParam.subscribe(linkParam => this.linkParam = linkParam)
    this.data.searchTableHeadersParams.subscribe(headerParams => this.headerMap = headerParams)
    this.data.tableData.subscribe(tableData => this.tableData = tableData)
    this.data.showTable.subscribe(showTable => this.showTable = showTable)
    this.data.loggedUserAT.subscribe(AT => this.AT = AT)
    this.buttonLabel = "Odobri"
  }

  // emits that link inside table is clicked
  // parent should open object of the same type parent class is
  openSelected(nesto: string) {
    switch (this.searchObject) {
      case "knjiga": this.data.changeRequestedBook(nesto)
        break
      case "profil": this.data.changeRequestedUser(nesto)
        break
      case "desavanje": // smisli
        break
    }
    this.linkClick.emit()
  }

  buttonClick(obj: any) {
    switch (this.AT) {
      case 2: console.log("Moderator click")
        console.log(obj)
        obj["odobrena"] = true
        break
      case 3: console.log("Admin click")
        console.log(obj)
    }
  }

}
