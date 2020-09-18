import { Injectable } from '@angular/core';
import { Desavanje } from '../modules/Desavanje'

@Injectable({
  providedIn: 'root'
})
export class EventService {
  desavanjeLista: Desavanje[]

  constructor() {
    this.fillDesavanjaLista()
  }

  // Method returns full list of events based on params
  nadjiDesavanja(searchParam: string, searchQuery: string): Array<Desavanje> {
    if (Array.isArray(this.desavanjeLista[0][searchParam]))
      return this.desavanjeLista.filter(x => x[searchParam].some(element => {
        return (element == searchQuery)
      }))
    else
      return this.desavanjeLista.filter(x => x[searchParam] == searchQuery)
  }

  // Method returns full list of events
  getAllEvents(): Array<Desavanje> {
    return this.desavanjeLista
  }

  // Temporary method for testing purposes
  fillDesavanjaLista(): void {
    this.desavanjeLista = [
      {
        id: 1,
        privatno: true,
        naziv: "Babyshower",
        pocetak: new Date(),
        kraj: new Date(),
        opis: "Ne znam, zene se okupljaju i tako to svasta, ne znam...",
        aktivno: true,
        kreator: "tduca998"
      },
      {
        id: 2,
        privatno: false,
        naziv: "Signing",
        pocetak: new Date(),
        kraj: new Date(),
        opis: "Dr. Castle potpisuje knjige dok obozavaoci dolaze i govore neke cringe citate iz knjige",
        aktivno: false,
        kreator: "rorynius"
      }
    ]
  }
}
