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
  showProfileBoolean:boolean
  showBooksBoolean:boolean
  showEventsBoolean:boolean

  constructor(private router:Router, private data:DataService) {
    this.showProfileBoolean = false
    this.showBooksBoolean = false
    this.showEventsBoolean = false
  }

  ngOnInit(): void {
    this.isAdmin = false
    this.isUser = false
    switch(this.data.dohvatiKorisnika().id) {
      case 1: this.isUser = true
        this.logButton = 'Log Out'
        this.showProfileBoolean = true
      break
      case 2: this.isAdmin = true
        this.logButton = 'Log Out'
        this.showProfileBoolean = true
      break
      default: this.logButton = 'Log In'
      break
    }
  }
  
  showBooks():void {
    this.showBooksBoolean = true
    this.showProfileBoolean = false
    this.showEventsBoolean = false
  }

  showEvents():void {
    this.showEventsBoolean = true
    this.showProfileBoolean = false
    this.showBooksBoolean = false
  }

  showProfile():void {
    this.showProfileBoolean = true
    this.showBooksBoolean = false
    this.showEventsBoolean = false
  }

  logOut():void {
    this.router.navigate(['/login']);
  }
}
