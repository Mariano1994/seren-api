import type fastify from 'fastify';

import { makeGetUserMetricsUseCase } from '../../../use-cases/factories/make-get-user-metrics-use-case.ts';

export async function metrics(
	request: fastify.FastifyRequest,
	reply: fastify.FastifyReply,
) {
	const getUserMetricsUseCase = makeGetUserMetricsUseCase();

	const { checksInsCount } = await getUserMetricsUseCase.handler({
		userId: request.user.sub,
	});

	return reply.status(201).send({
		checksInsCount,
	});
}
