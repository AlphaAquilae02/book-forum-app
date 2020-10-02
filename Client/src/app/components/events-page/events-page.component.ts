import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Table } from '../../modules/Table'
import * as moment from 'moment'

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css']
})
export class EventsPageComponent implements OnInit {
  showEventsTableParams: Table
  showTable: boolean

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    // this.data.showTable.subscribe(showTable => this.showTable = showTable)
    this.showTable = false
    this.showEventsTableParams = {
      searchObject: "desavanje",
      searchParams: ["naziv", "datum", "time", "uToku"],
      linkParam: "naziv",
      tableData: [],
      headerMap: {
        naziv: "Naziv",
        time: "Vreme od/do odrzavanja",
        datum: "Datum odrzavanja",
        uToku: "Trenutno u toku"
      },
      buttonLabel: ""
    }
    this.populateEvents()
  }

  async populateEvents() {
    this.showEventsTableParams.tableData = await this.eventService.getAllEvents()
    this.showEventsTableParams.tableData.forEach(obj => {

      obj['time'] = moment().to(moment(obj.pocetak))
      obj['datum'] = moment(obj.pocetak).format("D. MMMM YYYY.")

      if (moment().diff(moment(obj.pocetak)) > 0 && moment().diff(moment(obj.kraj)) < 0)
        obj['uToku'] = 'DA'
      else
        obj['uToku'] = 'NE'})
    this.showTable = true
  }

}
