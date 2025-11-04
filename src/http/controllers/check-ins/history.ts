import type fastify from 'fastify';
import z from 'zod';
import { makeFetchUserCheckInsHistoryUseCase } from '../../../use-cases/factories/make-fetch-user-ckeck-ins-history-use-case.ts';

export async function history(
	request: fastify.FastifyRequest,
	reply: fastify.FastifyReply,
) {
	const checkIndHistoryQuerySchema = z.object({
		page: z.coerce.number().min(1).default(1),
	});

	const { page } = checkIndHistoryQuerySchema.parse(request.query);

	const fetchUserCheckInHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();

	const { checkIns } = await fetchUserCheckInHistoryUseCase.handler({
		userId: request.user.sub,
		page,
	});

	return reply.status(201).send({
		checkIns,
	});
}
