import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showPreduzece:boolean;
  showPoljoprivrednik:boolean;

  constructor(private router:Router) { 
    this.showPreduzece = false;
    this.showPoljoprivrednik = false;

  }

  ngOnInit(): void {
  }

  /* Registruje promenu na radio button elementu i poziva metodu sa prosledjivanjem elementa kroz parametar */
  tipKorisnika(evt):void {
    var target = evt.target;
    let elementId: string = (evt.target as Element).id;
    if (elementId == "preduzece") {
      if (target.checked) {
        this.showPoljoprivrednik = false;
        this.showPreduzece = true;
      }
    }
    else if (elementId == "poljoprivrednik") {
      if (target.checked) {
        this.showPreduzece = false;
        this.showPoljoprivrednik = true;
      }
    }
  }

  back():void {
    this.router.navigate(['']);
  }

}
