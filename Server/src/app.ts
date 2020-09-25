import express from 'express'
import http from 'http'
import path from 'path'
import { Logger } from './middleware/logger'
import cors from 'cors'
import bb from 'express-busboy'

const app = express()
app.use(cors())

const PORT = process.env.PORT || 5000

bb.extend(app, {
    upload: true,
    path: 'images/',
    allowedPath: /./
});


// middleware implementation
const logger = new Logger()

app.use(logger.loggerMiddleware)

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// for parsing multipart/form-data
app.use(express.static('public'));

app.use(express.static(path.join(__dirname, '../../Client/dist/Projekat')))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/books', require('./routes/api/books'))
app.use('/api/events', require('./routes/api/events'))
app.use('/api/comments', require('./routes/api/comments'))

const server = http.createServer(app)

server.listen(PORT, () => console.log('Running...'))