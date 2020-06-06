import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-preduzece',
  templateUrl: './register-preduzece.component.html',
  styleUrls: ['./register-preduzece.component.css']
})
export class RegisterPreduzeceComponent implements OnInit {
  ime:string;
  skracenica:string;
  lozinka:string;
  datumOsnivanja:Date;
  mesto:string;
  emailAdresa:string;

  constructor() { }

  ngOnInit(): void {
  }

  register():void {
    console.log('register clicked');
  }

}
