import express from 'express'
import pool from './database'
import { v4 as uuidv4 } from 'uuid'
import cors from 'cors'

const router = express.Router()
router.use(cors())

// not allowed multiple query param search
router.get('', (req, res) => {

    let comments: { id: any; korisnikId: any; knjigaId: any; komentar: any; ocena: any; }[] = []

    let sqlQuery: string = ''
    if (req.query.knjigaId ? true : false) {
        sqlQuery = `SELECT * FROM comment WHERE knjigaId="${req.query.knjigaId}"`
    }
    else if (req.query.korisnikId ? true : false) {
        sqlQuery = `SELECT * FROM comment WHERE korisnikId="${req.query.korisnikId}"`
    }
    else {
        sqlQuery = 'SELECT * FROM comment'
    }

    if (sqlQuery.length != 0) {
        pool.getConnection((err, connection) => {
            if (err) throw err
            connection.query(sqlQuery, (err, rows, fields) => {
                if (err) throw err

                rows.forEach((element: any) => {
                    const comment = {
                        id: element.id,
                        korisnikId: element.korisnikId,
                        knjigaId: element.knjigaId,
                        komentar: element.komentar,
                        ocena: element.ocena
                    }
                    comments.push(comment)
                })
                res.json(comments)
                connection.release()
            })
        })

    }
    else {
        res.json({ msg: `Error` })
    }
})

router.get('/:korisnikId/', (req, res) => {

    let comments: Array<any> = []

    let sqlQuery: string = `SELECT comment.komentar, comment.ocena, users.korisnickoIme, books.naziv, books.id FROM comment INNER JOIN users ON 
    comment.korisnikId=users.id INNER JOIN books ON comment.knjigaId=books.id WHERE korisnikId="${req.params.korisnikId}"`
    
    if (sqlQuery.length != 0) {
        pool.getConnection((err, connection) => {
            if (err) throw err
            connection.query(sqlQuery, (err, rows, fields) => {
                if (err) throw err

                rows.forEach((element: any) => {
                    var userComment = element
                    comments.push(userComment)
                })
                res.json(comments)
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
    const comment = JSON.parse(req.body.data);
    var unique = true
    comment.id = uuidv4()

    if (unique) {
        pool.getConnection((err, connection) => {
            if (err) throw err
            var sqlQuery = `INSERT INTO comment (\`id\`, \`korisnikId\`, \`knjigaId\`, \`komentar\`, \`ocena\`) VALUES 
            ('${comment.id}', '${comment.korisnikId}', '${comment.knjigaId}', '${comment.komentar}', '${comment.ocena}')`
            connection.query(sqlQuery, (err, rows, fields) => {
                if (err) throw err

                res.json({ msg: `Uspesno dodat komentar sa id: ${comment.id}` })
                connection.release()
            })
        })
    }
})

// sql upit ka bazi da na osnovu parametara unese nove vrednosti u objekat
router.put('', (req, res) => {

    const user = JSON.parse(req.body.data);

    pool.getConnection((err, connection) => {
        if (err) throw err

        var sqlQuery = `UPDATE comment SET `

        for (const property in user) {
            if (property != 'id' || 'AT') {
                if (typeof user[property] !== 'string') {
                    sqlQuery = sqlQuery.concat(`${property} = '${JSON.stringify(user[property])}', `)
                }
                else {
                    sqlQuery = sqlQuery.concat(`${property} = '${user[property]}', `)
                }
            }
        }
        sqlQuery = sqlQuery.slice(0, -2);
        sqlQuery = sqlQuery.concat(` WHERE id = "${req.query.id}"`)

        connection.query(sqlQuery, (err, rows, fields) => {
            if (err) throw err

            res.json({ msg: `Uspesno azuriran komentar sa id: ${req.query.id}` })
            connection.release()
        })
    })
})

// sql upit ka bazi da se na osnovu parametra obrise objekat iz baze sa odgovarajucim id
/*router.delete('', (req, res) => {
    var id = req.query.id ? req.query.id.valueOf() : 0
    pool.getConnection((err, connection) => {
        if (err) throw err
        var sqlQuery = `DELETE FROM users WHERE id='${id}'`
        connection.query(sqlQuery, (err, rows, fields) => {
            if (err) throw err

            res.json({ msg: `Uspesno obrisan korisnik sa id: ${id}` })
            connection.release()
        })
    })
})*/

module.exports = router
export default router