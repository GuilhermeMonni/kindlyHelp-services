import fastify from "fastify"
import cors from "@fastify/cors"
import dotenv from "dotenv"
import {sql} from "./database.js"

dotenv.config()

const server = fastify({ logger: true })
await server.register(cors, { origin: true })

server.get('/', () => {
    return {message: 'Servidor rodando! 👽'}
})

server.get('/search', async (req, res) => {
    try {
        const services = await sql`SELECT * FROM services`
        return services
    } catch (error) {
        console.error('error when searching for service:', error)
    }
})

server.listen({
    host: '0.0.0.0',
    port: 3001,
})