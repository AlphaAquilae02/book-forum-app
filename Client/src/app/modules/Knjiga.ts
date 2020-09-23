export interface Knjiga {
    id:string
    slika:string
    naziv:string
    autor:Array<string>
    datumIzdavanja:string
    zanr:Array<string>
    opis:string
    prosecnaOcena:number
    brStrana:number
    odobrena:boolean
}