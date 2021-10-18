import dotenv from 'dotenv'
import crypto from 'crypto'

dotenv.config()

export default class Crypto {
	/**
	 *
	 * @param password {string}
	 * @param [salt]
	 * @returns {Promise<{encryptedPassword: string, salt: string}>}
	 */
	static async encryptWithSalt(password, salt) {
		salt = salt ?? (await crypto.randomBytes(64)).toString('hex')
		const encryptedPassword = crypto.pbkdf2Sync(password, salt, Number(process.env.ITERATION), 64, 'sha1').toString('hex')
		return { encryptedPassword, salt }
	}
}