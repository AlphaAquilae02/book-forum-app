import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Korisnik } from 'src/app/modules/Korisnik';
import { UserService } from 'src/app/services/user.service';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-profiles-page',
  templateUrl: './profiles-page.component.html',
  styleUrls: ['./profiles-page.component.css']
})
export class ProfilesPageComponent implements OnInit, OnDestroy {
  @ViewChild(ProfileComponent) child!: ProfileComponent
  @Input() requestedUser: string
  @Output() onDestroy = new EventEmitter<any>()
  @Output() goToBook = new EventEmitter<any>()

  showProfile: boolean
  searchQuery: string
  korisnik: Korisnik

  constructor(private userService:UserService) {
    this.showProfile = true
   }

  ngOnInit(): void {
    if (this.requestedUser != undefined) 
      this.search(this.requestedUser)
  }

  ngOnDestroy(): void {
    this.onDestroy.emit()
  }

  // Triggered when user submits searchQuery or when parent calls from profile.component
  search(query: string): void {
    var temp = this.userService.nadjiKorisnika(query)
    if (temp != null) {
      this.showProfile = true
      this.korisnik = temp
      if (this.child)
        this.child.prikaziKorisnika()
    }
  }

  requestedBook($event) {
    this.goToBook.emit($event)
  }

}
