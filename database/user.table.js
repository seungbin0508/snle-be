import db from './index.js'
import Crypto from '../util/crypto.js'

export default class UserTable {
	/**
	 * Insert a user into user table
	 * @param user {Object}
	 * @returns {Promise<void>}
	 */
	static async createUser (user) {
		const query = `
            INSERT INTO user(name, nickname, phone, enlist, password, salt)
            VALUES (?, ?, ?, ?, ?, ?);
		`
		const { name, nickname, phone, enlist, password } = user

		try {
			const { encryptedPassword, salt } = await Crypto.encryptWithSalt(password)
			await db.beginTransaction()
			await db.query(query, [name, nickname, phone, enlist, encryptedPassword, salt])
			await db.commit()
		} catch (err) {
			console.error(err)
			await db.rollback()
			console.log('not working')
		} finally {
			db.release()
		}
	}

	/**
	 * Find a user by phone number
	 * @param phone {string}
	 * @returns {Promise<Object>}
	 */
	static async findOneUserByPhone (phone) {
		const query = `
			SELECT * FROM user WHERE phone = ?;
		`
		try {
			await db.beginTransaction()
			const [[result]] = await db.query(query, [phone])
			await db.commit()
			return result
		} catch (err) {
			console.error(err)
			await db.rollback()
		} finally {
			db.release()
		}
	}

	/**
	 * Find all users from user table
	 * @returns {Promise<Object[]>}
	 */
	static async findAllUsers () {
		const query = `
			SELECT * FROM user;
		`
		try {
			await db.beginTransaction()
			const [result] = await db.query(query)
			await db.commit()
			return result
		} catch (err) {
			console.error(err)
			await db.rollback()
		} finally {
			db.release()
		}
	}

	/**
	 * @param phone {string}
	 * @param field {('nickname' | 'phone')}
	 * @param content {string} updated value
	 * @returns {Promise<void>}
	 */
	static async updateUser (phone, field, content) {
		const query = `
            UPDATE user
            SET ${field} = "${content}"
            WHERE phone = ${phone}
		`
		try {
			await db.beginTransaction()
			await db.query(query)
			await db.commit()
		} catch (err) {
			console.error(err)
			await db.rollback()
		} finally {
			db.release()
		}
	}
}