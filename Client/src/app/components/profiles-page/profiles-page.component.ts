import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Korisnik } from 'src/app/modules/Korisnik';
import { UserService } from 'src/app/services/user.service';
import { ProfileComponent } from '../profile/profile.component';
import { DataService } from 'src/app/services/data.service';
import { Table } from 'src/app/modules/Table';

@Component({
  selector: 'app-profiles-page',
  templateUrl: './profiles-page.component.html',
  styleUrls: ['./profiles-page.component.css']
})
export class ProfilesPageComponent implements OnInit, OnDestroy {
  @ViewChild(ProfileComponent) profileChild: ProfileComponent

  requestedUser: string

  showUserTableParams: Table
  showUserTable: boolean
  showUser: Boolean

  AT: number

  constructor(private userService: UserService, private data: DataService) {
    this.showUser = false
  }

  ngOnInit() {
    this.showUserTableParams = {
      searchObject: "profil",
      searchParams: ["ime", "prezime", "korisnickoIme", "button"],
      linkParam: "korisnickoIme",
      tableData: [],
      headerMap: {
        ime: "Ime",
        prezime: "Prezime",
        korisnickoIme: "Korisnicko Ime",
        button: ""
      },
      buttonLabel: "Odobri zahtev"
    }
    this.data.tableData.subscribe(tableData => this.showUserTableParams.tableData = tableData)
    this.data.setShowTable(false)
    this.data.showTable.subscribe(showTable => this.showUserTable = showTable)

    this.data.requestedUser.subscribe(requestedUser => this.requestedUser = requestedUser)
    this.data.loggedUserAT.subscribe(AT => this.AT = AT)
    if (this.requestedUser != "")
      this.openProfile()
    else {
      this.showUser = true
    }
  }

  async getAllUsersAuth() {
    this.data.setTableData( await this.userService.nadjiKorisnika('AT', '1'))
    this.data.setShowTable(true)
  }

  async getAllMods() {
    this.data.setTableData( await this.userService.nadjiKorisnika('AT', '3'))
    this.data.setShowTable(true)
  }

  ngOnDestroy(): void {
    this.data.changeRequestedUser("")
    this.data.setTableData([])
  }

  async openProfile(): Promise<void> {
    this.data.setLoadedUser(await this.userService.nadjiKorisnikaId(this.requestedUser))
    this.showUser = true
    if (this.profileChild) 
      this.profileChild.loadUserData()
  }
}
