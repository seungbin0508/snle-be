import express from 'express'
import router from './routes/index.js'

const app = express()

app.use(router)

app.listen(3000, () => {
	console.log('Server listening at port 3000')
})
