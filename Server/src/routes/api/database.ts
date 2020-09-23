import mysql from 'mysql'

const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'book_forum'
})

module.exports = pool
export default pool