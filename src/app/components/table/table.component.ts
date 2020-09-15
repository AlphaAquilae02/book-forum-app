import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Table } from 'src/app/modules/Table';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Output() linkClick = new EventEmitter()
  @Input() tableParams: Table
  
  AT: number
  tableSizeOptions: Array<number> // Set of options for table size

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.tableSizeOptions = [1, 5, 15, 50]

    this.data.loggedUserAT.subscribe(AT => this.AT = AT)
    this.tableParams.tableData.slice(0, this.tableSizeOptions[1]);
  }

  // emits that link inside table is clicked
  // parent should open object of the same type parent class is
  openSelected(nesto: string) {
    switch (this.tableParams.searchObject) {
      case "knjiga": this.data.changeRequestedBook(nesto)
        break
      case "profil": this.data.changeRequestedUser(nesto)
        break
      case "desavanje": console.log("Desavanje " + nesto + " trazeno!")// smisli
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

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.tableParams.tableData.slice(firstCut, secondCut);
  }

}
