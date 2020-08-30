import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedTab = new FormControl(0);
  logButton: string

  requestedUser: string
  requestedBook: string

  constructor(private router: Router, private data: DataService) {
  }

  // Triggered on component initialization
  ngOnInit(): void {
    this.setTabs()
  }

  // Triggered when user clicks "Log Out" button
  logOut(): void {
    this.router.navigate(['/login']);
  }

  // Triggered when user clicks link to book in profile.component
  // Triggered when profile.component emits message
  goToRequestedUser($event) {
    this.requestedUser = $event
    this.selectedTab.setValue(2)
  }

  // Triggered when profile.component destroys
  // Triggered when profile.component emits message
  profileChildDestroyed($event) {
    this.requestedUser = ""
  }

  // Triggered when user clicks link to book in profile.component
  // Triggered when profile.component emits message
  goToRequestedBook($event) {
    this.requestedBook = $event
    this.selectedTab.setValue(0)
  }

  // Triggered when books.component destroys
  // Triggered when books.component emits message
  bookChildDestroyed($event) {
    this.requestedBook = ""
  }

  // To be called on init 
  // Setting up tabs in main/home menu
  setTabs(): void {
    this.selectedTab.setValue(2)
    if (this.data.dohvatiKorisnika().AT == 0) {
      this.logButton = 'Log In'
      this.selectedTab.setValue(0)
    }
    else {
      this.logButton = 'Log Out'
    }
  }

}
