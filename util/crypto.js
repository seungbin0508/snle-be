import dotenv from 'dotenv'
import crypto from 'crypto'

dotenv.config()

export default class Crypto {
	static async encryptWithSalt(password) {
		const salt = (await crypto.randomBytes(64)).toString('hex')
		return crypto.pbkdf2Sync(password, salt, Number(process.env.ITERATION), 64, 'sha1').toString('hex')
	}
}