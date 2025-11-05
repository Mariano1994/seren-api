import type fastify from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt.ts';
import { authenticate } from './authenticate.ts';
import { profile } from './profile.ts';
import { refresh } from './refresh.ts';
import { register } from './register.ts';

export async function userRoutes(app: fastify.FastifyInstance) {
	app.post('/users', register);
	app.post('/session', authenticate);
	app.patch('/token/refresh', refresh);

	/* Authenticate */
	app.get('/me', { onRequest: [verifyJWT] }, profile);
}
