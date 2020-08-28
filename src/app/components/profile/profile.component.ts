import { Component, OnInit, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Korisnik } from 'src/app/modules/Korisnik';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  ulogovaniKorisnik:Korisnik
  editDisabled:boolean

  constructor(private data:DataService, private bookService:BookService) { 
    this.editDisabled = true
  }

  ngOnInit(): void {
    this.ulogovaniKorisnik = this.data.dohvatiKorisnika()
  }

  promeniPodatke():void {
    this.editDisabled = !this.editDisabled
  }

  pokupiImenaKnjiga(id:number):string {
    return this.bookService.nadjiKnjigu(id).naziv
  }

  ukloniSaListeZaCitanje(id:number):void {
    this.ulogovaniKorisnik.zaCitanjeKnjige.splice(this.ulogovaniKorisnik.zaCitanjeKnjige.findIndex(x => x == id), 1)
    this.data.postaviKorisnika(this.ulogovaniKorisnik)
  }

  otvoriKnjigu():void {
    console.log('otovori knjigu')
  }

}
