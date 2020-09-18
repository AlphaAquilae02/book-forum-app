/* Struktura za cuvanje podataka trenutno ulogovanog korisnika */
export interface Korisnik {
    id:number
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
    procitaneKnjige: Array<number>
    citamKnjige: Array<Array<number>>
    zaCitanjeKnjige: Array<number>
}
