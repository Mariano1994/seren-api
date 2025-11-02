import type fastify from 'fastify';
import { makeGetUserProfileUseCase } from '../../use-cases/factories/make-get-user-profile-use-case.ts';

export async function profile(
	request: fastify.FastifyRequest,
	reply: fastify.FastifyReply,
) {
	const userProfile = await makeGetUserProfileUseCase();

	const { user } = await userProfile.handler({
		userId: request.user.sub,
	});

	return reply.status(200).send({
		user: {
			...user,
			password_hash: undefined,
		},
	});
}
