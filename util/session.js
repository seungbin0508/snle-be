import jwt from 'jsonwebtoken'
export default class Session {
	/**
	 * @param user {Object<phone: string, admin: boolean>}
	 * @returns {Promise<*>}
	 */
	static async getAccessToken(user) {
			const payload = {
				phone: user.phone,
				admin: user.admin
			}

			return jwt.sign(payload, process.env.JWTSECRET, {
				algorithm: 'HS256',
				expiresIn: '1h'
			})
	}
}
