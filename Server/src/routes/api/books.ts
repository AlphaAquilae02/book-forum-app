import express from 'express'
import pool from './database'
import { v4 as uuidv4 } from 'uuid'
import cors from 'cors'
import fs from 'fs'
import { rawListeners } from 'process'

const router = express.Router()
router.use(cors())

// not allowed multiple query param search
router.get('', (req, res) => {
    let books: { id: any; slika: any; naziv: any; autor: any; datumIzdavanja: any; zanr: any; opis: string; prosecnaOcena: any; }[] = []

    let sqlQuery: string = ''
    if (req.query.autor ? true : false)
        sqlQuery = `SELECT * FROM books WHERE autor LIKE "%${req.query.autor}%"`
    else if (req.query.naziv ? true : false)
        sqlQuery = `SELECT * FROM books WHERE naziv LIKE "%${req.query.naziv}%"`
    else if (req.query.zanr ? true : false)
        sqlQuery = `SELECT * FROM books WHERE zanr LIKE "%${req.query.zanr}%"`
    else if (req.query.odobrena ? true : false)
        sqlQuery = `SELECT * FROM books WHERE odobrena=0`
    else
        sqlQuery = 'SELECT * FROM books'

    if (sqlQuery.length != 0) {
        pool.getConnection((err, connection) => {
            if (err) throw err
            connection.query(sqlQuery, (err, rows, fields) => {
                if (err) throw err

                rows.forEach((element: any) => {
                    const book = {
                        id: element.id,
                        slika: element.slika,
                        naziv: element.naziv,
                        autor: element.autor,
                        datumIzdavanja: element.datumIzdavanja,
                        zanr: element.zanr,
                        opis: element.opis,
                        prosecnaOcena: element.prosecnaOcena,
                        brStrana: element.brStrana,
                        odobrena: element.odobrena
                    }
                    books.push(book)
                    console.log(books)
                })
                res.json(books)
                connection.release()
            })
        })

    }
    else {
        res.json({ msg: `Error` })
    }
})

router.get('/genres/all', (req, res) => {

    let zanroviLista: Array<any> = []

    let sqlQuery: string = `SELECT * FROM zanrovi`

    if (sqlQuery.length != 0) {
        pool.getConnection((err, connection) => {
            if (err) throw err
            connection.query(sqlQuery, (err, rows, fields) => {
                if (err) throw err

                rows.forEach((element: any) => {
                    zanroviLista.push(element.tip)
                })
                res.json(zanroviLista)
                connection.release()
            })
        })
    }
    else {
        res.json({ msg: `Error` })
    }
})

router.get('/:id', (req, res) => {

    let books: Array<any> = []

    let sqlQuery: string = `SELECT * FROM books WHERE id="${req.params.id}"`

    if (sqlQuery.length != 0) {
        pool.getConnection((err, connection) => {
            if (err) throw err
            connection.query(sqlQuery, (err, rows, fields) => {
                if (err) throw err

                rows.forEach((element: any) => {
                    const book = {
                        id: element.id,
                        slika: element.slika,
                        naziv: element.naziv,
                        autor: element.autor,
                        datumIzdavanja: element.datumIzdavanja,
                        zanr: element.zanr,
                        opis: element.opis,
                        prosecnaOcena: element.prosecnaOcena,
                        brStrana: element.brStrana,
                        odobrena: element.odobrena
                    }
                    books.push(book)
                })
                res.json(books)
                connection.release()
            })
        })

    }
    else {
        res.json({ msg: `Error` })
    }
})

router.get('/name/:id', (req, res) => {

    let sqlQuery: string = `SELECT naziv FROM books WHERE id="${req.params.id}"`

    if (sqlQuery.length != 0) {
        pool.getConnection((err, connection) => {
            if (err) throw err
            connection.query(sqlQuery, (err, rows, fields) => {
                if (err) throw err

                res.json(rows[0])
                connection.release()
            })
        })

    }
    else {
        res.json({ msg: `Error` })
    }
})

// sql upit ka bazi da na osnovu unetih parametara ubaci novi objekat u bazu podataka
router.post('', (req, res) => {
    const book = JSON.parse(req.body.data);
    var unique = true

    const file: any = (<any>req).files; // KOJI KURAC // linter proverava da ta klasa req nema to polje

    var filePath: string = file.image.file.replace(/[\\]/g, '/') // ovo saljes na user.slika
    filePath = filePath.replace('images/', '')

    if (unique) {
        pool.getConnection((err, connection) => {
            if (err) throw err
            var sqlQuery = `INSERT INTO books (\`id\`, \`slika\`, \`naziv\`, \`autor\`, \`datumIzdavanja\`, \`zanr\`, \`opis\`, \`prosecnaOcena\`, \`brStrana\`, \`odobrena\`) VALUES 
            ('${uuidv4()}', '${filePath}', '${book.naziv}', '${JSON.stringify(book.autor)}', '${book.datumIzdavanja}', '${JSON.stringify(book.zanr)}', '${book.opis}', ${book.prosecnaOcena}, ${book.brStrana}, ${book.odobrena})`
            connection.query(sqlQuery, (err, rows, fields) => {
                if (err) throw err

                res.json({ msg: `Uspesno dodata knjiga sa nazivom: ${book.naziv}` })
                connection.release()
            })
        })
    }
})

// sql upit ka bazi da na osnovu unetih parametara ubaci novi objekat u bazu podataka
router.post('/multiple', (req, res) => {
    const multipleBooks: any = <File>(<any>req).files
    var filePath = multipleBooks.file.file.replace(/[\\]/g, '/')
    console.log(filePath)

    let rawdata = fs.readFileSync(filePath);
    let student = JSON.parse(rawdata.toString());

    for (let obj of student.books) {
        //console.log(obj.opis.replace(/[\']/g, '\'\''))
        pool.getConnection((err, connection) => {
            if (err) throw err
            var sqlQuery = `INSERT INTO books (\`id\`, \`slika\`, \`naziv\`, \`autor\`, \`datumIzdavanja\`, \`zanr\`, \`opis\`, \`prosecnaOcena\`, \`brStrana\`, \`odobrena\`) VALUES 
            ('${uuidv4()}', '', '${obj.naziv}', '${JSON.stringify(obj.autor)}', '${obj.datumIzdavanja}', '${JSON.stringify(obj.zanr)}', '${obj.opis.replace(/[\']/g, '\'\'')}', 0, 0, false)`
            connection.query(sqlQuery, (err, rows, fields) => {
                if (err) throw err

                connection.release()
            })
        })
    }

    res.json(" msg: 'asd'")

})

// sql upit ka bazi da na osnovu parametara unese nove vrednosti u objekat
router.put('', (req, res) => {

    const book = JSON.parse(req.body.data);

    pool.getConnection((err, connection) => {
        if (err) throw err

        var sqlQuery = `UPDATE books SET `

        for (const property in book) {
            if (property != 'id' || 'AT') {
                console.log(typeof book[property])
                if (typeof book[property] === 'boolean') {
                    sqlQuery = sqlQuery.concat(`${property} = ${book[property]}, `)
                    console.log('in boolean')
                }
                else if (typeof book[property] !== 'string') {
                    sqlQuery = sqlQuery.concat(`${property} = '${JSON.stringify(book[property])}', `)
                }
                else {
                    sqlQuery = sqlQuery.concat(`${property} = '${book[property]}', `)
                    console.log('in else')
                }
            }
        }

        sqlQuery = sqlQuery.slice(0, -2);
        sqlQuery = sqlQuery.concat(` WHERE id = "${req.query.id}"`)

        console.log(`sqlQuery: ${sqlQuery}`)

        connection.query(sqlQuery, (err, rows, fields) => {
            if (err) throw err

            res.json({ msg: `Uspesno azurirana knjiga sa id: ${req.query.id}` })
            connection.release()
        })
    })

})

// sql upit ka bazi da se na osnovu parametra obrise objekat iz baze sa odgovarajucim id
router.delete('', (req, res) => {
    var id = req.query.id ? req.query.id.valueOf() : 0
    pool.getConnection((err, connection) => {
        if (err) throw err
        var sqlQuery = `DELETE FROM books WHERE id='${id}'`
        connection.query(sqlQuery, (err, rows, fields) => {
            if (err) throw err

            res.json({ msg: `Uspesno obrisana knjiga sa id: ${id}` })
            connection.release()
        })
    })
})

module.exports = router
export default router