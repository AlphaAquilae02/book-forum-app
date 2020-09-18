import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  email:string
  emailAuthenticated:boolean
  novaLozinka:string
  novaLozinka2:string

  constructor(private router:Router) {
    this.emailAuthenticated = false
   }

  ngOnInit(): void {
  }

  sendEmail():void {
    this.emailAuthenticated = true
  }

  changePassword():void {
    this.back()
  }

  back():void {
    this.router.navigate(['/login']);
  }
}
