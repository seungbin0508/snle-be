import { createClient } from 'redis'
import dotenv from 'dotenv'

dotenv.config()

const client = createClient({ url: process.env.REDIS })

client.on('error', err => console.error('Redis Client Error', err))

await client.connect()

export default client