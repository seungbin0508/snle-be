import UserTable from '../database/user.table.js'
import Crypto from '../util/crypto.js'
import Session from '../util/session.js'
import { saveRefreshTokenInRedis } from '../redis/util.js'

export default class UserController {
	static async login (req, res, next) {
		const { id, password } = req.body

		try {
			const user = await UserTable.findOneUserByPhone(id)
			if (!user) {
				const error = {
					message: 'No user found under given ID!',
					status: 400,
					type: 'Invalid Parameter'
				}
				return next(error)
			}

			const { salt, password: savedPassword } = user
			const { encryptedPassword } = await Crypto.encryptWithSalt(password, salt)
			if (encryptedPassword !== savedPassword) {
				const error = {
					message: 'Invalid Password!',
					status: 401,
					type: 'Invalid Password'
				}
				return next(error)
			}

			const accessToken = Session.getAccessToken(user)
			const refreshToken = Session.getRefreshToken()

			await saveRefreshTokenInRedis(id, refreshToken)

			return res.json({
				success: true,
				accessToken,
				refreshToken
			})
		} catch (err) {
			console.error(err)
			const error = {
				message: err.message,
				status: 500,
				type: 'Server Error'
			}
			return next(error)
		}
	}
}