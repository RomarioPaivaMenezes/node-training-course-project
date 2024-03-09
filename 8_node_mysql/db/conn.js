const mysql = require('mysql2')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost', 
    user: 'root',
    password: 'root', 
    database: 'root_db'
})

module.exports = pool