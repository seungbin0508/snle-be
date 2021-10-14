import mysql from 'mysql2/promise.js'

const pool = mysql.createPool({
	host: 'localhost',
	user: 'test',
	password: 'test',
	database: 'SNLE'
})

connection.connect()