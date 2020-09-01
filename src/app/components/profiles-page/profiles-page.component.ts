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
  @Output() goToBook = new EventEmitter<any>()

  requestedUser: string
  korisnik: Korisnik

  showUser: boolean
  searchObject: string
  searchParams: Array<string>
  linkParam: string
  

  constructor(private userService:UserService, private data:DataService) {
    this.showUser = true
    this.searchObject = "profil"
    this.searchParams = [
      "ime", "prezime", "korisnickoIme"
    ]
    this.linkParam = this.searchParams[2]
   }

  ngOnInit(): void {
    this.data.requestedUser.subscribe(requestedUser => this.requestedUser = requestedUser)
    if (this.requestedUser != "")
      this.openProfile()
  }

  ngOnDestroy(): void {
    this.data.changeRequestedUser("")
  }

  openProfile(): void {
    console.log(this.korisnik)
    console.log(this.requestedUser)
    this.showUser = true
    this.korisnik = this.userService.nadjiKorisnikaKorisnickoIme(this.requestedUser)
    console.log(this.korisnik)
    if (this.profileChild)
      this.profileChild.prikaziKorisnika()
  }

  openBook() {
    this.goToBook.emit()
  }
}
