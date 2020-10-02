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

  updateUser(korisnik: Korisnik, params: Array<string>): void {
    var updatedParams: any = {}
    params.forEach( param => {
      updatedParams[param] = korisnik[param]
    });

    console.log(updatedParams)

    const fd = new FormData();
    fd.append('data', JSON.stringify(updatedParams));

    this.axiosRequest.put(`API/users?id=${korisnik.id}`, fd)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }

  dodajKorisnika(korisnik: Korisnik, file: any): void {
    const fd = new FormData();
    
    const ext = file.name.split('.').slice(-1)[0];
    fd.append('image', file, `${korisnik.korisnickoIme}.${ext}`);
    fd.append('data', JSON.stringify(korisnik));

    this.axiosRequest.post('API/users', fd)
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
    console.log(`${username} ${password}`)
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

}