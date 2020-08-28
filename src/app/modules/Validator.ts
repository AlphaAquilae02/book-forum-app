export class Validator {
    private usernameRegEx:RegExp;

    constructor () {
        this.usernameRegEx = new RegExp(/\w{2}/gi) // minimum number of char (8)
    }

    onInit() {

    }

    /* Metoda za validaciju korisnickog imena */
    validateUsername(username:string):boolean {
        if ( username.search(this.usernameRegEx) == 0 ) return true;
        else return false;
    }

    validatePassword(password:string):boolean {
        return true;
    }

}