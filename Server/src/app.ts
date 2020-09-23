import express from 'express'
import http from 'http'
import path from 'path'
import { Logger } from './middleware/logger'
import cors from 'cors'

const app = express()
app.use(cors())

const PORT = process.env.PORT || 5000

// middleware implementation
const logger = new Logger()

app.use(logger.loggerMiddleware)

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, '../../Client/dist/Projekat')))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/books', require('./routes/api/books'))
app.use('/api/events', require('./routes/api/events'))
app.use('/api/comments', require('./routes/api/comments'))

const server = http.createServer(app)

server.listen(PORT, () => console.log('Running...'))