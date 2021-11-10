import UserTable from '../database/user.table.js'
import db from '../database/index.js'

describe('Member test', () => {
	const phone = '01012345678'
	const name = '정해인'

	it('should create a user called 정해인', async () => {
		await UserTable.createUser(
			{ name, phone, password: '1234', enlist: new Date() })

	})


	afterAll(async () => {
		const query = `
            DELETE FROM user
            WHERE phone = ${phone}
		`
		await db.query(query)
	})

})