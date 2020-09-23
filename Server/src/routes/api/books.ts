import express from 'express'
import pool from './database'
import { v4 as uuidv4 } from 'uuid'
import cors from 'cors'

const router = express.Router()
router.use(cors())

// not allowed multiple query param search
router.get('', (req, res) => {
    //console.log(req.params)

    let books: { id: any; slika: any; naziv: any; autor: any; datumIzdavanja: any; zanr: any; opis: string; prosecnaOcena: any; }[] = []

    let sqlQuery: string = ''
    if (req.query.autor ? true : false) {
        sqlQuery = `SELECT * FROM books WHERE autor LIKE "%${req.query.autor}%"`
    }
    else if (req.query.naziv ? true : false) {
        sqlQuery = `SELECT * FROM books WHERE naziv LIKE "%${req.query.naziv}%"`
    }
    else if (req.query.zanr ? true : false) {
        sqlQuery = `SELECT * FROM books WHERE zanr LIKE "%${req.query.zanr}%"`
    }
    else {
        sqlQuery = 'SELECT * FROM books'
    }

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

router.get('/:id', (req, res) => {

    let books: { id: any; slika: any; naziv: any; autor: any; datumIzdavanja: any; zanr: any; opis: string; prosecnaOcena: any; }[] = []

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
    const book = req.body
    var unique = true
    book.id = uuidv4()

    if (unique) {
        pool.getConnection((err, connection) => {
            if (err) throw err
            var sqlQuery = `INSERT INTO users (\`id\`, \`slika\`, \`naziv\`, \`autor\`, \`datumIzdavanja\`, \`zanr\`, \`opis\`, \`prosecnaOcena\`, \`brStrana\`, \`odobrena\`) VALUES 
            ('${book.id}', '${book.slika}', '${book.naziv}', '${book.autor}', '${book.datumIzdavanja}', '${book.zanr}', '${book.opis}', ${book.prosecnaOcena}, ${book.brStrana}, ${book.odobrena})`
            connection.query(sqlQuery, (err, rows, fields) => {
                if (err) throw err

                res.json({ msg: `Uspesno dodata knjiga sa nazivom: ${book.naziv}` })
                connection.release()
            })
        })
    }
})

// sql upit ka bazi da na osnovu parametara unese nove vrednosti u objekat
router.put('', (req, res) => {

    const book = req.body

    pool.getConnection((err, connection) => {
        if (err) throw err

        var sqlQuery = `UPDATE users SET `

        for (const property in book) {
            if (property != 'id' || 'AT')
                sqlQuery = sqlQuery.concat(`${property} = '${book[property]}', `);
        }
        sqlQuery = sqlQuery.slice(0, -2);
        sqlQuery = sqlQuery.concat(` WHERE id = ${req.query.id}`)

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