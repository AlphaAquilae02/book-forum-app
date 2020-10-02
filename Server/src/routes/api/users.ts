import express from 'express'
import pool from './database'
import { v4 as uuidv4 } from 'uuid'
import cors from 'cors'
import sendMail from './mail'

const router = express.Router()
router.use(cors())

// not allowed multiple query param search
router.get('', (req, res) => {
    console.log(req.params)

    let users: { id: any; AT: any; ime: any; prezime: any; slika: any; korisnickoIme: any; lozinka: string; datumRodjenja: any; grad: any; drzava: any; email: any; procitaneKnjige: any; citamKnjige: any; zaCitanjeKnjige: any }[] = []

    let sqlQuery: string = ''
    if (req.params.username ? true : false && req.params.password ? true : false)
        sqlQuery = `SELECT * FROM users WHERE korisnickoIme="${req.params.korisnickoIme}" AND lozinka="${req.params.lozinka}"`

    if (req.query.ime ? true : false) {
        sqlQuery = `SELECT * FROM users WHERE ime LIKE "%${req.query.ime}%"`
    }
    else if (req.query.prezime ? true : false) {
        sqlQuery = `SELECT * FROM users WHERE prezime LIKE "%${req.query.prezime}%"`
    }
    else if (req.query.korisnickoIme ? true : false) {
        sqlQuery = `SELECT * FROM users WHERE korisnickoIme LIKE "%${req.query.korisnickoIme}%"`
    }
    else if (req.query.id ? true : false) {
        sqlQuery = `SELECT * FROM users WHERE id="${req.query.id}"`
    }
    else if (req.query.AT ? true : false) {
        sqlQuery = `SELECT * FROM users WHERE AT="${req.query.AT}"`
    }
    else {
        sqlQuery = 'SELECT * FROM users'
    }

    if (sqlQuery.length != 0) {
        pool.getConnection((err, connection) => {
            if (err) throw err
            connection.query(sqlQuery, (err, rows, fields) => {
                if (err) throw err

                rows.forEach((element: any) => {
                    const user = {
                        id: element.id,
                        AT: element.AT,
                        ime: element.ime,
                        prezime: element.prezime,
                        slika: element.slika,
                        korisnickoIme: element.korisnickoIme,
                        lozinka: '',
                        datumRodjenja: element.datumRodjenja,
                        grad: element.grad,
                        drzava: element.drzava,
                        email: element.email,
                        procitaneKnjige: element.procitaneKnjige,
                        citamKnjige: element.citamKnjige,
                        zaCitanjeKnjige: element.zaCitanjeKnjige
                    }
                    users.push(user)
                })
                res.json(users)
                connection.release()
            })
        })

    }
    else {
        res.json({ msg: `Error` })
    }
})

// sets AT of user to guest
router.get('/:id', (req, res) => {

    var sqlQuery = `UPDATE users SET AT=1 WHERE id="${req.params.id}"`

    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(sqlQuery, (err, rows, fields) => {
            if (err) throw err

            res.redirect('http://localhost:5000')

            connection.release()
        })
    })
})

// returns user data for login
router.get('/:korisnickoIme/:lozinka', (req, res) => {
    console.log(req.params)

    let users: { id: any; AT: any; ime: any; prezime: any; slika: any; korisnickoIme: any; lozinka: string; datumRodjenja: any; grad: any; drzava: any; email: any; procitaneKnjige: any; citamKnjige: any; zaCitanjeKnjige: any }[] = []

    let sqlQuery: string = ''
    if (req.params.korisnickoIme ? true : false && req.params.lozinka ? true : false) {
        sqlQuery = `SELECT * FROM users WHERE korisnickoIme="${req.params.korisnickoIme}" AND lozinka="${req.params.lozinka}"`
    }

    if (sqlQuery.length != 0) {
        pool.getConnection((err, connection) => {
            if (err) throw err
            connection.query(sqlQuery, (err, rows, fields) => {
                if (err) throw err

                rows.forEach((element: any) => {
                    const user = {
                        id: element.id,
                        AT: element.AT,
                        ime: element.ime,
                        prezime: element.prezime,
                        slika: element.slika,
                        korisnickoIme: element.korisnickoIme,
                        lozinka: '',
                        datumRodjenja: element.datumRodjenja,
                        grad: element.grad,
                        drzava: element.drzava,
                        email: element.email,
                        procitaneKnjige: element.procitaneKnjige,
                        citamKnjige: element.citamKnjige,
                        zaCitanjeKnjige: element.zaCitanjeKnjige
                    }
                    users.push(user)
                })
                res.json(users)
                connection.release()
            })
        })

    }
    else {
        res.json({ msg: `Error` })
    }
})

// updates user with new param
router.put('', (req, res) => {

    const user = JSON.parse(req.body.data);

    pool.getConnection((err, connection) => {
        if (err) throw err

        var sqlQuery = `UPDATE users SET `

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

            res.json({ msg: `Uspesno azuriran korisnik sa id: ${req.query.id}` })
            connection.release()
        })
    })

})

// adds new not activated(AT = 0) user in DB and sends email for user to activate account
router.post('', (req, res) => {
    const user = JSON.parse(req.body.data);
    var unique = true
    user.id = uuidv4()

    const file: any = (<any>req).files; // KOJI KURAC // linter proverava da ta klasa req nema to polje

    var filePath: string = file.image.file.replace(/[\\]/g, '/') // ovo saljes na user.slika
    filePath = filePath.replace('images/', '')

    sendMail(user.id, user.email)

    if (unique) {
        pool.getConnection((err, connection) => {
            if (err) throw err
            var sqlQuery = `INSERT INTO users (\`id\`, \`AT\`, \`ime\`, \`prezime\`, \`slika\`, \`korisnickoIme\`, \`lozinka\`, \`datumRodjenja\`, \`grad\`, \`drzava\`, \`email\`, \`procitaneKnjige\`, \`citamKnjige\`, \`zaCitanjeKnjige\`) VALUES 
            ('${uuidv4()}', ${user.AT}, '${user.ime}', '${user.prezime}', '${filePath}', '${user.korisnickoIme}', '${user.lozinka}', '${user.datumRodjenja}', '${user.grad}', '${user.drzava}', '${user.email}', '${JSON.stringify(user.procitaneKnjige)}', '${JSON.stringify(user.citamKnjige)}','${JSON.stringify(user.zaCitanjeKnjige)}')`
            connection.query(sqlQuery, (err, rows, fields) => {
                if (err) throw err

                res.json({ msg: `Uspesno dodat korisnik sa korisnickim imenom: ${user.korisnickoIme}` })
                connection.release()
            })
        })
    }
})

// deletes user from DB
router.delete('', (req, res) => {
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
})

module.exports = router
export default router