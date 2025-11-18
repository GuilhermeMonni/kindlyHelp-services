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

server.get('/search', async (req, reply) => {
    try { //search infos from database
        const services = await sql`select * from services`
        return services
    } catch (error) {
        reply.code(400).send('error when searching for service:', error)
    }

    reply.code(200).send('sucess when search service')
})

server.post('/send', async (req, reply) => { //send infos to database review
    const {name, services, address, cell, email} = req.body
    const id = crypto.randomUUID()

    try{
        const review = await sql`insert into review (id, name, services,address, cell, email) values (${id}, ${name}, ${services}, ${address}, ${cell}, ${email})`
        return review
    } catch(error){
        reply.code(400).send('error when send service:', error)
    }

    reply.code(201).send('data sends to table review')
})

server.listen({
    host: '0.0.0.0',
    port: 3001,
})