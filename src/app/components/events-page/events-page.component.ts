import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { EventService } from 'src/app/services/event.service';
import { Table } from '../../modules/Table'

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css']
})
export class EventsPageComponent implements OnInit, OnDestroy {
  showEventsTableParams: Table

  constructor(private data: DataService, private eventService: EventService) { }

  ngOnInit(): void {
    this.showEventsTableParams = {
      searchObject: "desavanje",
      searchParams: ["naziv", "aktivno"],
      linkParam: "naziv",
      tableData: this.eventService.getAllEvents(),
      headerMap: {
        naziv: "Naziv",
        aktivno: "Status"
      },
      buttonLabel: ""
    }
  }

  ngOnDestroy(): void {
    //this.data.setShowTable(false)
  }

}
