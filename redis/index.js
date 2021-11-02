import { createClient } from 'redis'

import dotenv from 'dotenv'

dotenv.config()

const redisClient = createClient({
	url: `redis://admin:${process.env.REDIS_PASSWORD}@redis-19593.c290.ap-northeast-1-2.ec2.cloud.redislabs.com:19593`,
})

redisClient.on('error', err => console.error('Redis Client Error', err))

await redisClient.connect()

export default redisClient
