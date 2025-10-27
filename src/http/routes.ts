import type fastify from 'fastify';
import { authenticate } from './controllers/authenticate-controller.ts';
import { register } from './controllers/register-controller.ts';

export async function appRoutes(app: fastify.FastifyInstance) {
	app.post('/users', register);
	app.post('/session', authenticate);
}
