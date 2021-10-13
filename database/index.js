import mysql from 'mysql2'

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'test',
	password: 'test',
	database: 'SNLE'
})

connection.connect()