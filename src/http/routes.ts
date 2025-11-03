import type fastify from 'fastify';
import { authenticate } from './controllers/authenticate.ts';
import { profile } from './controllers/profile.ts';
import { register } from './controllers/register.ts';
import { verifyJWT } from './middlewares/verify-jwt.ts';

export async function appRoutes(app: fastify.FastifyInstance) {
	app.post('/users', register);
	app.post('/session', authenticate);

	app.get('/me', { onRequest: [verifyJWT] }, profile);
}
