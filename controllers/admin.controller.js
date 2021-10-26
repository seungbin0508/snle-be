import UserTable from '../database/user.table.js'

export default class AdminController {
	static async certifyAdmin (req, res, next) {
		const { _id: userId } = res?.locals?.user
		if (!userId) {
			const error = {
				message: 'userId is missing!',
				status: 400,
				type: 'Invalid Parameter'
			}
			return next(error)
		}

		const user = await UserTable.findOneUserByPhone(userId)
		// By using MongoDB, can set projection to admin field

		const { admin } = user

		return admin
	}
}