import express from 'express'
import cors from 'cors'

const router = express.Router()
router.use(cors())

var imageFolderPath: string = 'C:/Users/cnik9/Angular/Projekat/book-forum-app/Server/images/'

router.get('', function (req, res) {
    if (req.query.path ? true : false)
        res.sendFile(imageFolderPath + req.query.path);
    else res.sendStatus(404)
});

module.exports = router
export default router