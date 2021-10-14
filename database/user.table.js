import db from './index.js'

export default class UserTable {
	static async createUser () {
		const query = `
            INSERT INTO user(name, nickname, phone, enlist, password)
            VALUES (?, ?, ?, ?, ?);
		`

		try {
			await db.query(`DELETE FROM user`)
			await db.query(query, ['seungbin', 'John', '01090277906', new Date(), '12345'])
		} catch (err) {
			console.error(err)
			await db.rollback()
			console.log('not working')
		} finally {
			db.release()
		}
	}
}

await UserTable.createUser()