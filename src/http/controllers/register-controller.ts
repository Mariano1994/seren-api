import type fastify from 'fastify';
import z from 'zod';
import { PrismaUsersRespository } from '../../respositories/prisma/prisma-users-repository.ts';
import { RegisterUseCase } from '../../use-cases/register-case.ts';

export async function register(
	request: fastify.FastifyRequest,
	reply: fastify.FastifyReply,
) {
	const registerBodyShema = z.object({
		name: z.string(),
		email: z.email(),
		password: z.string().min(6),
	});

	const { name, email, password } = registerBodyShema.parse(request.body);

	try {
		const usersRespository = new PrismaUsersRespository();
		const registerUseCase = new RegisterUseCase(usersRespository);

		await registerUseCase.handler({ name, email, password });
	} catch (error) {
		return reply.status(409).send();
	}

	return reply.status(201).send();
}
