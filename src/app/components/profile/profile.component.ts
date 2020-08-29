import { Component, OnInit, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Korisnik } from 'src/app/modules/Korisnik';
import { BookService } from 'src/app/services/book.service';
import { CommentService } from 'src/app/services/comment.service';
import { Komentar } from 'src/app/modules/Komentar';
import { Knjiga } from 'src/app/modules/Knjiga';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  ulogovaniKorisnik:Korisnik
  editDisabled:boolean
  commentsTableColumns:string[]
  booksTableReadColumns:string[]
  booksTableReadingColumns:string[]
  booksTableToReadColumns:string[]

  constructor(private data:DataService, private bookService:BookService, private commentService:CommentService) { 
    this.editDisabled = true
    this.commentsTableColumns = ['knjigaId', 'komentar', 'ocena', 'zanr']
    this.booksTableReadColumns = ['procitaneKnjige']
    this.booksTableReadingColumns = ['citamKnjige']
    this.booksTableToReadColumns = ['zaCitanjeKnjige']
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

  pokupiKomentare():Komentar[] {
    return this.commentService.nadjiKorisnikKomentare(this.ulogovaniKorisnik)
  }

  pokupiKnjigu(id:number):Knjiga {
    return this.bookService.nadjiKnjigu(id)
  }

}
