import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Korisnik } from 'src/app/modules/Korisnik';
import { UserService } from 'src/app/services/user.service';
import { ProfileComponent } from '../profile/profile.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profiles-page',
  templateUrl: './profiles-page.component.html',
  styleUrls: ['./profiles-page.component.css']
})
export class ProfilesPageComponent implements OnInit, OnDestroy {
  @ViewChild(ProfileComponent) profileChild: ProfileComponent

  requestedUser: string
  korisnik: Korisnik

  showUser: Boolean
  
  constructor(private userService:UserService, private data:DataService) {
    this.showUser = true
   }

  ngOnInit(): void {
    this.data.setSearchObject("profil")
    this.data.setSearchParams(["ime", "prezime", "korisnickoIme"])
    this.data.setSearchLinkParam("korisnickoIme")
    this.data.setSearchTableHeadersParams({
      ime: "Ime",
      prezime: "Prezime",
      korisnickoIme: "Korisnicko Ime"
    })
    this.data.requestedUser.subscribe(requestedUser => this.requestedUser = requestedUser)
    if (this.requestedUser != "")
      this.openProfile()
  }

  ngOnDestroy(): void {
    /*this.data.setSearchObject("")
    this.data.setSearchParams([""])
    this.data.setSearchLinkParam("")
    this.data.setSearchTableHeadersParams({})*/
    this.data.changeRequestedUser("")
  }

  openProfile(): void {
    this.showUser = true
    this.korisnik = this.userService.nadjiKorisnikaKorisnickoIme(this.requestedUser)
    if (this.profileChild)
      this.profileChild.prikaziKorisnika()
  }
}
