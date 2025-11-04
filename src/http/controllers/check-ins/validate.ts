import type fastify from 'fastify';
import z from 'zod';
import { makeValidateCheckInUseCase } from '../../../use-cases/factories/make-validate-check-in-use-case.ts';

export async function validate(
	request: fastify.FastifyRequest,
	reply: fastify.FastifyReply,
) {
	const validateCheckInParamsSchema = z.object({
		checkInId: z.uuid(),
	});

	const { checkInId } = validateCheckInParamsSchema.parse(request.params);

	const validateCheckInUseCase = makeValidateCheckInUseCase();

	await validateCheckInUseCase.handler({
		checkInId,
	});

	return reply.status(204).send();
}
