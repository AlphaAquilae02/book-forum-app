export interface Table {
    searchObject: string // tip objekta koji se prikazuje
    searchParams: Array<string> // parametri po kojima se formiraju kolone
    linkParam: string // parametar koji treba da se formira kao link
    tableData: Array<any> // full data array to display
    headerMap: Object // objekat za mapiranje imena kolone sa parametrom kolone
    buttonLabel: string // tekst za ispis na dugmetu
}