import { Injectable } from '@angular/core';
import { Desavanje } from '../modules/Desavanje'
import axios, { AxiosInstance } from 'axios'

@Injectable({
  providedIn: 'root'
})
export class EventService {
  desavanjeLista: Desavanje[]
  axiosRequest: AxiosInstance

  constructor() {
    this.fillDesavanjaLista()
    this.axiosRequest = axios.create({
      baseURL: 'http://localhost:5000/',
      timeout: 1000
    })
  }

  // Method returns full list of events
  async getAllEvents(): Promise<Array<Desavanje>> {
    var tempEventList: Array<Desavanje> = []

    await this.axiosRequest.get(`API/events`)
      .then(response => {
        console.log(response)
          response.data.forEach(element => {
          tempEventList.push(element)
        });
        console.log(tempEventList)
      })
      .catch(err => {
        console.log(err)
      })
      console.log(tempEventList)
      return tempEventList
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
