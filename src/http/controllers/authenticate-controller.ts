import type fastify from 'fastify';
import z from 'zod';
import { PrismaUsersRespository } from '../../respositories/prisma/prisma-users-repository.ts';
import { AuthenticateUseCase } from '../../use-cases/authenticate-case.ts';
import { InvalidCredentialsError } from '../../use-cases/erros/invalid-credentials-error.ts';
import { makeAuthenticateUseCase } from '../../use-cases/factories/make-authenticate-use-case.ts';

export async function authenticate(
	request: fastify.FastifyRequest,
	reply: fastify.FastifyReply,
) {
	const autheticateBodyShema = z.object({
		email: z.email(),
		password: z.string().min(6),
	});

	const { email, password } = autheticateBodyShema.parse(request.body);

	try {
		const authenticateUseCase = makeAuthenticateUseCase();
		await authenticateUseCase.handler({ email, password });
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return reply.status(400).send({ message: error.message });
		}

		throw error;
	}

	return reply.status(200).send();
}
