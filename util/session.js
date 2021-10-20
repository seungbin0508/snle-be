import jwt from 'jsonwebtoken'
import redisClient from './redis.js'
import UserTable from '../database/user.table.js'

export default class Session {
	/**
	 * @param user {Object<phone: string, admin: boolean>}
	 * @returns {string}
	 */
	static getAccessToken (user) {
		const payload = {
			phone: user.phone,
			admin: user.admin
		}

		return jwt.sign(payload, process.env.JWTSECRET, {
			algorithm: 'HS256',
			expiresIn: '1h'
		})
	}

	/**
	 * @param token {string}
	 * @returns {{success: true, phone: string, admin: boolean}|{success: false}}
	 */
	static verifyAccessToken (token) {
		try {
			const { phone, admin } = jwt.verify(token, process.env.JWTSECRET)
			return { success: true, phone, admin }
		} catch (err) {
			console.error(err)
			return { success: false }
		}
	}

	static getRefreshToken () {
		return jwt.sign({}, process.env.JWTSECRET, {
			algorithm: 'HS256',
			expiresIn: '14d'
		})
	}

	static async verifyRefreshToken (token, phone) {
		try {
			token.verify(token, process.env.JWTSECRET)
			const savedToken = await redisClient.get(phone)
			return token === savedToken
		} catch (err) {
			console.error(err)
			return false
		}
	}
}
