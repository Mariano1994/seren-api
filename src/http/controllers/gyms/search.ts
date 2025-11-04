import type fastify from 'fastify';
import z from 'zod';
import { makeSearchGymsUseCase } from '../../../use-cases/factories/make-search-gyms-use-case.ts';

export async function search(
	request: fastify.FastifyRequest,
	reply: fastify.FastifyReply,
) {
	const searchGymsQuerySchema = z.object({
		q: z.string(),
		page: z.coerce.number().min(1).default(1),
	});

	const { q, page } = searchGymsQuerySchema.parse(request.query);

	const searchGyms = makeSearchGymsUseCase();

	const { gyms } = await searchGyms.handler({
		query: q,
		page,
	});

	return reply.status(202).send({
		gyms,
	});
}
