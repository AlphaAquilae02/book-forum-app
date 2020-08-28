export interface Knjiga {
    id:number
    slika:string
    naziv:string
    autor:Array<string>
    datumIzdavanja:string
    zanr:Array<string>
    opis:string
    prosecnaOcena:number
}