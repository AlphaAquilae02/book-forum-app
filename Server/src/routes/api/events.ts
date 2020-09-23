import express from 'express'
import pool from './database'
import cors from 'cors'

const router = express.Router()
router.use(cors())

// not allowed multiple query param search
router.get('', (req, res) => {

    let events: {
        id: any;
        privatno: any;
        naziv: any;
        pocetak: any;
        kraj: any;
        opis: any;
        aktivno: string;
        kreator: any;
    }[] = []

    let sqlQuery = 'SELECT * FROM event'

    if (sqlQuery.length != 0) {
        pool.getConnection((err, connection) => {
            if (err) throw err
            connection.query(sqlQuery, (err, rows, fields) => {
                if (err) throw err

                rows.forEach((element: any) => {
                    const event = {
                        id: element.id,
                        privatno: element.privatno,
                        naziv: element.naziv,
                        pocetak: element.pocetak,
                        kraj: element.kraj,
                        opis: element.opis,
                        aktivno: element.aktivno,
                        kreator: element.kreator
                    }
                    events.push(event)
                })
                res.json(events)
                connection.release()
            })
        })

    }
    else {
        res.json({ msg: `Error` })
    }
})

module.exports = router
export default router