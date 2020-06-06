/* Struktura za cuvanje podataka korisnika tipa 'poljoprivrednik' */
export interface Poljoprivrednik {
    id:number;
    ime:string;
    prezime:string;
    korisnickoIme:string;
    lozinka:string;
    datumRodjenja:string;
    mestoRodjenja:string;
    kontaktTelefon:number;
    email:string;
}