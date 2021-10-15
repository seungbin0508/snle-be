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
}

const user = {
	name: '승빈',
	nickname: 'John',
	phone: '01090277906',
	enlist: new Date(),
	password: '12345'
}

await UserTable.createUser(user)