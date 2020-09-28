import { Injectable } from '@angular/core';
import { Korisnik } from '../modules/Korisnik';
import { DataService } from './data.service';
import axios, { AxiosInstance } from 'axios'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  korisnikLista: Korisnik[]
  axiosRequest: AxiosInstance

  constructor(private data: DataService) {
    this.fillPreduzeceLista() // temp za punjenje
    this.axiosRequest = axios.create({
      baseURL: 'http://localhost:5000/',
      timeout: 1500
    })
  }

  async imageExists(path:String): Promise<boolean> {
    var returnBool = false
    await this.axiosRequest.get(`API/image?path=${path}`)
    .then(res => {
      returnBool = (res.status == 200) ? true : false
    })
    .catch(err => {
      console.log(err)
    })
    return returnBool
  }

  // On user edit params
  sacuvajKorisnika(korisnik: Korisnik): void {
    console.log(korisnik)
    var tempUser = {
      ime: korisnik.ime,
      prezime: korisnik.prezime,
      datumRodjenja: korisnik.datumRodjenja,
      grad: korisnik.grad,
      email: korisnik.email
    }

    this.axiosRequest.put(`API/users?id=${korisnik.id}`, tempUser)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })

  }

  // skontaj ovo u najmladjem if da bi mogao da hvatas razlike
  // i time saljes update req samo onoga sto je zapravo promenjeno
  saveUpdates(korisnik: Korisnik): void {
    console.log(korisnik)
    var original: Korisnik = this.data.dohvatiKorisnika()
    console.log(Object.keys(original))
    var queries: string = ""
    Object.keys(original).forEach( string => {
      //console.log(string)
      if(string != "id" && string != "AT") {
        if (korisnik[string] != original[string]) {
          console.log(string)
          //queries = queries.concat(string, "=", `${korisnik[string]}`)
        }
      }
    })
    //console.log(queries)
  }

  // Ovde menjaj, radi sta hoces ovo se poziva pri registraciji
  // Mozes i da pravis dva post req, kako god, nije mi bitno
  dodajKorisnika(korisnik: Korisnik): void {
    var tempUser = {
      id: '0',
      AT: 1,
      ime: korisnik.ime,
      prezime: korisnik.prezime,
      slika: korisnik.slika,
      korisnickoIme: korisnik.korisnickoIme,
      lozinka: korisnik.lozinka,
      datumRodjenja: korisnik.datumRodjenja,
      grad: korisnik.grad,
      drzava: korisnik.drzava,
      email: korisnik.email,
      procitaneKnjige: '[]',
      citamKnjige: '[]',
      zaCitanjeKnjige: '[]'
    }
    this.axiosRequest.post('API/users', korisnik)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // NOT TESTED
  obrisiKorisnika(korisnik: Korisnik): void {
    this.axiosRequest.delete(`API/users?id=${korisnik.id}`)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // Called on user input
  async nadjiKorisnika(searchParam: string, searchQuery: string): Promise<Array<Korisnik>> {
    var tempKorisnikLista: Array<any> = []

    await this.axiosRequest.get(`API/users?${searchParam}=${searchQuery}`)
      .then(response => {
        response.data.forEach(element => {
          element.procitaneKnjige = JSON.parse(element.procitaneKnjige)
          element.citamKnjige = JSON.parse(element.citamKnjige)
          element.zaCitanjeKnjige = JSON.parse(element.zaCitanjeKnjige)
          tempKorisnikLista.push(element)
        });
      })
      .catch(err => {
        console.log(err)
      })
    return tempKorisnikLista
  }

  // Called from within the app by the app
  async nadjiKorisnikaKorisnickoIme(korisnickoIme: string): Promise<Korisnik> {
    //API call
    var user: Korisnik
    await this.axiosRequest.get(`API/users?korisnickoIme=${korisnickoIme}`)
      .then(response => {
        user = response.data[0]
        user.procitaneKnjige = JSON.parse(response.data[0].procitaneKnjige)
        user.citamKnjige = JSON.parse(response.data[0].citamKnjige)
        user.zaCitanjeKnjige = JSON.parse(response.data[0].zaCitanjeKnjige)
      })
      .catch(err => {
        console.log(err)
      })

    return user
  }

  async nadjiKorisnikaId(id: string): Promise<Korisnik> {
    var user: Korisnik
    await this.axiosRequest.get(`API/users?id=${id}`)
      .then(response => {
        if (response.data[0] ? true : false) {
          user = response.data[0]
          user.procitaneKnjige = JSON.parse(response.data[0].procitaneKnjige)
          user.citamKnjige = JSON.parse(response.data[0].citamKnjige)
          user.zaCitanjeKnjige = JSON.parse(response.data[0].zaCitanjeKnjige)
        }
      })
      .catch(err => {
        console.log(err)
      })

    return user
  }

  async korisnikLogIn(username: string, password: string): Promise<boolean> {
    let logged: boolean = false
    var user: Korisnik
    await this.axiosRequest.get(`API/users/${username}/${password}`)
      .then(response => {
        user = response.data[0]
        user.procitaneKnjige = JSON.parse(response.data[0].procitaneKnjige)
        user.citamKnjige = JSON.parse(response.data[0].citamKnjige)
        user.zaCitanjeKnjige = JSON.parse(response.data[0].zaCitanjeKnjige)
        this.data.postaviKorisnika(user)
        this.data.setLoadedUser(user)
        if (user.id ? true : false)
          logged = true
      })
      .catch(err => {
        console.log(err)
      })

    return logged
  }

  /* Totalno nebitne metode, privremeno u upotrebi radi pravljenja funkcionalnosti ostatka app */
  fillPreduzeceLista(): void {
    this.korisnikLista = [
      {
        id: '1',
        AT: 1,
        ime: 'Dusan',
        prezime: 'Tomanic',
        slika: 'nah',
        korisnickoIme: 'tduca998',
        lozinka: '1234',
        datumRodjenja: '11/02/1998',
        grad: 'Stara Pazova',
        drzava: 'Srbija',
        email: 'tduca998@gmail.com',
        procitaneKnjige: [],
        citamKnjige: [['1', 10, 1], ['2', 15, 0]],
        zaCitanjeKnjige: []
      },
      {
        id: '2',
        AT: 2,
        ime: 'Rory',
        prezime: 'Wolk',
        slika: 'gay',
        korisnickoIme: 'rorynius',
        lozinka: 'asd',
        datumRodjenja: '20/05/1970',
        grad: 'San Francisco',
        drzava: 'USA',
        email: 'rory@wolk.com',
        procitaneKnjige: ['2', '3'],
        citamKnjige: [['1', 20, 1]],
        zaCitanjeKnjige: ['1']
      }
    ]
  }

}