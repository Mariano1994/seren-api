import type fastify from 'fastify';
import z from 'zod';
import { makeFetchNearByGymUseCase } from '../../../use-cases/factories/make-fetch-nearBy-gym-use-case.ts';

export async function nearBy(
	request: fastify.FastifyRequest,
	reply: fastify.FastifyReply,
) {
	const nearByGymsQuerySchema = z.object({
		latitude: z.number().refine((value) => {
			return Math.abs(value) <= 90;
		}),
		logitude: z.number().refine((value) => {
			return Math.abs(value) <= 180;
		}),
	});

	const { latitude, logitude } = nearByGymsQuerySchema.parse(request.query);

	const fetchNearByGymsUseCase = makeFetchNearByGymUseCase();

	const { gyms } = await fetchNearByGymsUseCase.handler({
		userLatitude: latitude,
		userLongitude: logitude,
	});
	return reply.status(202).send({
		gyms,
	});
}
