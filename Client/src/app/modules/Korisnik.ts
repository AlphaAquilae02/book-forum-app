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
    procitaneKnjige: Array<string> // [id, id, ... ]
    citamKnjige: Array<Array<any>> // [[id, brStrane, citam], [], ... ] citam = 1 || 0 , citam = true = 1
    zaCitanjeKnjige: Array<string> // [id, id, ... ]
}
