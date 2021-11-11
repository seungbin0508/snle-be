import UserTable from '../database/user.table.js'
import db from '../database/index.js'
import Crypto from '../util/crypto.js'

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

	it("should update the member's nickname to 안준호", async () => {
		await UserTable.updateUser(phone, 'nickname', '안준호')
		const user = await UserTable.findOneUserByPhone(phone)
		expect(user.name).toBe('정해인')
	})

	it('should be able to update password', async () => {
		const newPassword = '5678'
		await UserTable.updatePassword(phone, newPassword)
		const {
			password: savedPassword,
			salt
		} = await UserTable.findOneUserByPhone(phone)
		const { encryptedPassword } = await Crypto.encryptWithSalt(newPassword,
			salt)
		expect(savedPassword).toBe(encryptedPassword)
	})

	afterAll(async () => {
		const query = `
            DELETE FROM user
            WHERE phone = ${phone}
		`
		await db.query(query)
	})

})