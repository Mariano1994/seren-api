import fastify from 'fastify'
import z from "zod"
import { prisma } from "../../lib/prisma.ts"


export async function register (request:fastify.FastifyRequest, reply: fastify.FastifyReply)  {
  const registerBodyShema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6)
  })

  const { name, email, password} = registerBodyShema.parse(request.body)

await prisma.user.create({
  data: {
    name,
    email,
    password_hash: password
  }
})


  return reply.status(201).send()
}