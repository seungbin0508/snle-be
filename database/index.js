import mysql from 'mysql2/promise.js'
import dotenv from 'dotenv'

dotenv.config()
const pool = mysql.createPool({
	host: 'snle.chwz13ezrqql.ap-northeast-2.rds.amazonaws.com',
	user: 'admin',
	password: process.env.MYSQLPASSWORD,
})

const connection = await pool.getConnection()

try {
	await connection.beginTransaction()
	const createDatabase = `
	CREATE DATABASE IF NOT EXISTS SNLE;
	`
	const useDatabase = `
	USE SNLE;
	`
	const query = `
create table IF NOT EXISTS user
(
	name varchar(20) not null,
	nickname varchar(20) null,
	phone varchar(11) not null primary key unique,
	enlist date not null,
	withdrawal date null,
	participation smallint default 100 null,
	admin tinyint(1) default 0 null,
	password varchar(64) null,
    salt char(64) null
);`
	await connection.query(createDatabase)
	await connection.query(useDatabase)
	await connection.query(query)
	await connection.commit()
	console.log('Database and user table are ready')
} catch (err) {
	await connection.rollback()
	console.error(err)
} finally {
	connection.release()
}

export default connection