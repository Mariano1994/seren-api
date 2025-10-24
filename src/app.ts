import fastify from 'fastify';
import {z} from 'zod';
import { prisma } from './lib/prisma.ts';
export const app = fastify();


app.post('/users', async(request, reply) => {
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


  return reply.status(201).send('User created')
})

