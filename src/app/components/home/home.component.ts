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

  searchTypes: Array<string>

  constructor(private router: Router, private data: DataService) {
    this.searchTypes = ["knjiga", "profil"]
  }

  ngOnInit(): void {
    this.setTabs()
  }

  logOut(): void {
    this.router.navigate(['/login']);
  }

  goToProfileTab() {
    this.selectedTab.setValue(2)
  }

  goToBookTab() {
    this.selectedTab.setValue(0)
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
