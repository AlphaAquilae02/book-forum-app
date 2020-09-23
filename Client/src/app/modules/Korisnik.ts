/* Struktura za cuvanje podataka trenutno ulogovanog korisnika */
export interface Korisnik {
    id:string
    AT:number
    ime:string
    prezime:string
    slika:string
    korisnickoIme:string
    lozinka:string
    datumRodjenja:string
    grad:string
    drzava:string
    email:string
    procitaneKnjige: Array<string>
    citamKnjige: Array<Array<any>>
    zaCitanjeKnjige: Array<string>
}
