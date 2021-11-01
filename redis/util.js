import redisClient from './index.js'

async function saveRefreshTokenInRedis(userId, refreshToken) {
	await redisClient.set(userId, refreshToken)
}