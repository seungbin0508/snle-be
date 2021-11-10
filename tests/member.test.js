import UserTable from '../database/user.table.js'
import db from '../database/index.js'

describe('Member test', () => {
	const phone = '01012345678'
	const name = '정해인'

	it('should create a user called 정해인', async () => {
		await UserTable.createUser(
			{ name, phone, password: '1234', enlist: new Date() })

	})
	it('should find user called 정해인 by phone number', async () => {
		const user = await UserTable.findOneUserByPhone(phone)
		await expect(user.name).toBe(name)
	})

	it('should throw an error when creating user with duplicate phone number', async () => {
		try {
			await UserTable.createUser({ name, phone, password: '5678', enlist: new Date()})
		} catch (err) {
			expect(err.message).toBe("Duplicate entry '01012345678' for key 'user.PRIMARY'")
		}
	})

	afterAll(async () => {
		const query = `
            DELETE FROM user
            WHERE phone = ${phone}
		`
		await db.query(query)
	})

})