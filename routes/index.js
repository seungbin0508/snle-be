import { Router } from 'express'

const router = new Router()

router.use((req, res, next) => {
	return res.sendStatus(404)
})

export default router