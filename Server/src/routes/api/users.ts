import express from 'express'
const router = express.Router()

// not allowed multiple query param search
// sql upit ka bazi da na osnovu ispunjenog uslova vrati odgovarajucu listu rezultata
router.get('', (req, res) => {
    if (req.query.ime ? true : false) {
        console.log(req.query.ime)
        res.json({ msg: `Trazen korisnik pod imenom: ${req.query.ime}` })
    }
    else if (req.query.prezime ? true : false) {
        console.log(req.query.prezime)
        res.json({ msg: `Trazen korisnik pod prezimenom: ${req.query.prezime}` })
    }
    else if (req.query.korisnickoIme ? true : false) {
        console.log(req.query.korisnickoIme)
        res.json({ msg: `Trazen korisnik pod korisnickim imenom: ${req.query.korisnickoIme}` })
    }
    else {
        res.json(users)
    }
})

// sql upit ka bazi da na osnovu unetih parametara ubaci novi objekat u bazu podataka
router.post('', (req, res) => {
    const user = {
        id: 2,
        ime: req.body.ime
    }
    if (!user.ime)
        res.status(400).json({ msg: 'Ime nije validno' })
    users.push(user)

    res.json(users)
})

// sql upit ka bazi da na osnovu parametara unese nove vrednosti u objekat
router.put('', (req, res) => {
    var id = req.query.id ? req.query.id.valueOf() : 0
    const found = users.some(obj => obj.id == id)
    console.log(found)
    if (found) {
        const updatedUser = req.body
        users.forEach(user => {
            if (user.id == id) {
                user.id = updatedUser.id ? updatedUser.id : user.id
                user.ime = updatedUser.ime ? updatedUser.ime : user.ime

                res.json(users)
            }
        })
    }
    else {
        res.status(400).json({ msg: `Ne postoji korisnik sa id: ${req.query.id}` })
    }
})

// sql upit ka bazi da se na osnovu parametra obrise objekat iz baze sa odgovarajucim id
router.delete('', (req, res) => {
    var id = req.query.id ? req.query.id.valueOf() : 0
    const found = users.some(obj => obj.id == id)
    console.log(found)
    if (found) {
        // sql upit za brisanje
    }
    else {
        res.status(400).json({ msg: `Ne postoji korisnik sa id: ${req.query.id}` })
    }
})

const users = [
    {
        id: 0,
        ime: 'Nikola'
    },
    {
        id: 1,
        ime: 'Dusan'
    }
]

module.exports = router
export default router