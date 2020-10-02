import { Component, OnInit } from '@angular/core';
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

  AT:number

  constructor(private router: Router, private data: DataService) {
    /* 
     * Ovo stoji da bi se na reload postavio onaj korisnik koji je zapravo ulogovan
     * moze i bez toga ali onda svaki refresh zapravo odradi logout, kasnije proveriti
     * u zavisnosti sta si napravio za validaciju i autentifikaciju trenutno 
     * ulogovanog korisnika i shodno tome promeni logiku ovoga
     */
    this.data.setLoggedUserAT(this.data.dohvatiKorisnika().AT)
    this.data.selectedTab.subscribe(selectedTab => this.selectedTab.setValue(selectedTab))
    this.data.loggedUserAT.subscribe(AT => this.AT = AT)
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
  if (this.AT <= 1) {
      this.logButton = 'Log In'
      this.selectedTab.setValue(0)
    }
    else {
      this.logButton = 'Log Out'
    }
  }

}
