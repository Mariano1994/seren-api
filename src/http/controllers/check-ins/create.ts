import type fastify from 'fastify';
import z from 'zod';
import { makeCheckInUseCase } from '../../../use-cases/factories/make-check-in-use-case.ts';

export async function create(
	request: fastify.FastifyRequest,
	reply: fastify.FastifyReply,
) {
	const createCheckInParamsSchema = z.object({
		gymId: z.uuid(),
	});
	const createCheckInBodySchema = z.object({
		latitude: z.number().refine((value) => {
			return Math.abs(value) <= 90;
		}),
		logitude: z.number().refine((value) => {
			return Math.abs(value) <= 180;
		}),
	});

	const { gymId } = createCheckInParamsSchema.parse(request.params);
	const { latitude, logitude } = createCheckInBodySchema.parse(request.body);

	const checkInUseCase = makeCheckInUseCase();

	await checkInUseCase.handler({
		gymId,
		userId: request.user.sub,
		userLatitude: latitude,
		userLongitude: logitude,
	});

	return reply.status(201).send();
}
