import UserTable from './database/user.table.js'
import Crypto from './util/crypto.js'
import db from './database/index.js'

describe('User table', () => {
	const phone = '01012345678'
	const inputName = '정해인'
	const inputPassword = '1234'
	beforeAll(async () => {

		await db.query(`
            DELETE
            FROM user
            WHERE phone = "${phone}";
		`)

		const user = {
			name: inputName,
			nickname: 'Handsome',
			phone,
			enlist: new Date(),
			password: inputPassword
		}
		await UserTable.createUser(user)
	})

	it('should connect to AWS RDS', () => {
		expect(db).toBeTruthy()
	})

	it('should create a user called 정해인', async () => {
		const { name } = await UserTable.findOneUserByPhone(phone)
		expect(inputName).toBe(name)
	})

	it('should create valid hashed password and salt key', async () => {
		const { password, salt } = await UserTable.findOneUserByPhone(phone)
		const { encryptedPassword } = await Crypto.encryptWithSalt(inputPassword, salt)
		expect(encryptedPassword).toBe(password)
	})
})
