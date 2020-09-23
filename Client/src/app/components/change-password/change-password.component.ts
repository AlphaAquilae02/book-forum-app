import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private router:Router, private userService:UserService) {
    this.emailAuthenticated = false
   }

  ngOnInit(): void {
  }

  sendEmail():void {
    this.emailAuthenticated = true
  }

  changePassword():void {
    /*if (novaLozinka == novaLozinka2)
      await this.userService.updateUser(id{ lozinka: novaLozinka})
    else 
      novaLozinka = ""
      novaLozinka2 = ""*/
    this.back()
  }

  back():void {
    this.router.navigate(['/login']);
  }
}
