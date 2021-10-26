import fs from 'fs'
import path from 'path'
import express from 'express'
import morgan from 'morgan'
import router from './routes/index.js'

const app = express()

app.use(router)

app.listen(3000, () => {
	console.log('Server listening at port 3000')
})
