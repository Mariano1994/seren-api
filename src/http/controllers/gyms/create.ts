import type fastify from 'fastify';
import z from 'zod';
import { makeCreateGymUseCase } from '../../../use-cases/factories/make-create-gym-use-case.ts';

export async function create(
	request: fastify.FastifyRequest,
	reply: fastify.FastifyReply,
) {
	const createGymsBodySchema = z.object({
		title: z.string(),
		description: z.string().nullable(),
		phone: z.string().nullable(),
		latitude: z.number().refine((value) => {
			return Math.abs(value) <= 90;
		}),
		logitude: z.number().refine((value) => {
			return Math.abs(value) <= 180;
		}),
	});

	const { title, description, phone, latitude, logitude } =
		createGymsBodySchema.parse(request.body);

	const createGym = makeCreateGymUseCase();

	await createGym.handler({
		title,
		description,
		phone,
		latitude,
		logitude,
	});

	return reply.status(202).send();
}
