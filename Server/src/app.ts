import express from 'express'
import http from 'http'
import path from 'path'
import { Logger } from './middleware/logger'

const app = express()

const PORT = process.env.PORT || 5000

// middleware implementation
const logger = new Logger()

app.use(logger.loggerMiddleware)

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, '../../Client/dist/Projekat')))
app.use('/api/users', require('./routes/api/users'))

const server = http.createServer(app)

server.listen(PORT, () => console.log('Running...'))