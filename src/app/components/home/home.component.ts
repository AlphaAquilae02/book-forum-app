import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAdmin:boolean
  isUser:boolean
  logButton:string
  showBooksBoolean:boolean
  showEventsBoolean:boolean

  constructor(private router:Router, private data:DataService) {
    this.isAdmin = false
    this.isUser = false
    this.showBooksBoolean = false
    this.showEventsBoolean = false
  }

  ngOnInit(): void {
    switch(this.data.dohvatiKorisnika().id) {
      case 1: this.isUser = true
        this.logButton = 'Log Out'
      break
      case 2: this.isAdmin = true
        this.logButton = 'Log Out'
      break
      default: this.logButton = 'Log In'
      break
    }
  }

  logOut():void {
    this.router.navigate(['/login']);
  }
}
