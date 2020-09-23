import express from 'express'
import pool from './database'
import { v4 as uuidv4 } from 'uuid'
import cors from 'cors'

const router = express.Router()
router.use(cors())

// not allowed multiple query param search
router.get('', (req, res) => {
    console.log(req.params)

    let users: { id: any; AT: any; ime: any; prezime: any; slika: any; korisnickoIme: any; lozinka: string; datumRodjenja: any; grad: any; drzava: any; email: any; procitaneKnjige: any; citamKnjige: any; zaCitanjeKnjige: any }[] = []

    let sqlQuery: string = ''
    if (req.params.username ? true : false && req.params.password ? true : false) {
        sqlQuery = `SELECT * FROM users WHERE korisnickoIme="${req.params.korisnickoIme}" AND lozinka="${req.params.lozinka}"`
    }

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


// sql upit ka bazi da na osnovu unetih parametara ubaci novi objekat u bazu podataka
router.post('', (req, res) => {
    const user = req.body
    var unique = true
    user.id = uuidv4()

    // Save image in folder, with name 'path/username.format'

    // Check if user.id unique in DB

    if (unique) {
        pool.getConnection((err, connection) => {
            if (err) throw err
            var sqlQuery = `INSERT INTO users (\`id\`, \`AT\`, \`ime\`, \`prezime\`, \`slika\`, \`korisnickoIme\`, \`lozinka\`, \`datumRodjenja\`, \`grad\`, \`drzava\`, \`email\`, \`procitaneKnjige\`, \`citamKnjige\`, \`zaCitanjeKnjige\`) VALUES 
        ('${user.id}', ${user.AT}, '${user.ime}', '${user.prezime}', '${user.slika}', '${user.korisnickoIme}', '${user.lozinka}', '${user.datumRodjenja}', '${user.grad}', '${user.drzava}', '${user.email}', '${user.procitaneKnjige}', '${user.citamKnjige}','${user.zaCitanjeKnjige}')`
            connection.query(sqlQuery, (err, rows, fields) => {
                if (err) throw err

                res.json({ msg: `Uspesno dodat korisnik sa korisnickim imenom: ${user.korisnickoIme}` })
                connection.release()
            })
        })
    }
})

// sql upit ka bazi da na osnovu parametara unese nove vrednosti u objekat
router.put('', (req, res) => {

    const user = req.body

    pool.getConnection((err, connection) => {
        if (err) throw err

        var sqlQuery = `UPDATE users SET `

        for (const property in user) {
            if (property != 'id' || 'AT')
                sqlQuery = sqlQuery.concat(`${property} = '${user[property]}', `);
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

// sql upit ka bazi da se na osnovu parametra obrise objekat iz baze sa odgovarajucim id
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

/*const user = {
        id: req.body.id,
        AT: req.body.AT,
        ime: req.body.ime,
        prezime: req.body.prezime,
        slika: req.body.slika,
        korisnickoIme: req.body.korisnickoIme,
        lozinka: req.body.lozinka,
        datumRodjenja: req.body.datumRodjenja,
        grad: req.body.grad,
        drzava: req.body.drzava,
        email: req.body.email,
        procitaneKnjige: req.body.procitaneKnjige,
        citamKnjige: req.body.citamKnjige,
        zaCitanjeKnjige: req.body.zaCitanjeKnjige
    }*/