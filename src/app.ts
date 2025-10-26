import fastify from 'fastify';
import z, { ZodError } from 'zod';
import { env } from '../env/index.ts';
import { appRoutes } from './http/routes.ts';

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, _request, reply) => {
	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: 'Validation Error', issue: z.treeifyError(error) });
	}

	if (env.NODE_ENV !== 'production') {
		console.error(error);
	} else {
		// TODO: Here we should log to an external tool like DataDog / NewRelic/ Sentry
	}

	return reply.status(500).send({
		message: 'Internal error server',
	});
});
