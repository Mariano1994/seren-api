import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import z, { ZodError } from 'zod';
import { env } from '../env/index.ts';
import { checkInsRoutes } from './http/controllers/check-ins/routes.ts';
import { gymsRoutes } from './http/controllers/gyms/routes.ts';
import { userRoutes } from './http/controllers/users/routes.ts';

export const app = fastify();

app.register(fastifyCookie);

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'refreshToken',
		signed: false,
	},
	sign: {
		expiresIn: '10m',
	},
});

app.register(userRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

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
