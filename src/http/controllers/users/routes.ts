import type fastify from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt.ts';
import { authenticate } from './authenticate.ts';
import { profile } from './profile.ts';
import { register } from './register.ts';

export async function userRoutes(app: fastify.FastifyInstance) {
	app.post('/users', register);
	app.post('/session', authenticate);

	app.get('/me', { onRequest: [verifyJWT] }, profile);
}
