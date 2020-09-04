import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Output() open = new EventEmitter() 

  searchObject: string
  searchParams: Array<string>
  linkParam: string
  tableData: Array<any>
  headerMap: Object
  /* 
  *  IZBACI TABLE IZ SEARCH KOD KNJIGA I KOD PROFILA I NAMESTI DA SVE IDE KAO STO
  *  TRENUTNO RADI NA DESAVANJIMA TABU, PROVERI I AKO SI NESTO PROPUSTIO U 
  *  IMPLEMENTACIJI OVOG NACINA
  * 
  *  KOD EMITOVANJA EVENTA ZA OTVARANJE LINKA ISTO SKONTAJ KAKO JE NAJBOLJE
  *  DA SE NE SJEBE NISTA A DA MINIMALNO IMAS TIH PRACENJA STA GDE IDE
  */
  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.searchObject.subscribe(obj => this.searchObject = obj)
    this.data.searchParams.subscribe(paramList => this.searchParams = paramList)
    this.data.searchLinkParam.subscribe(linkParam => this.linkParam = linkParam)
    this.data.searchTableHeadersParams.subscribe(headerParams => this.headerMap = headerParams)
    this.data.tableData.subscribe(tableData => this.tableData = tableData)
  }

  openSelected(nesto: string) {
    switch (this.searchObject) {
      case "knjiga": this.data.changeRequestedBook(nesto)
        break
      case "profil": this.data.changeRequestedUser(nesto)
        break
      case "desavanje": // smisli
        break
    }
    this.open.emit()
  }

}
