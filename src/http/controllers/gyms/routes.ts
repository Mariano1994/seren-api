import type fastify from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt.ts';
import { create } from './create.ts';
import { nearBy } from './nearBy.ts';
import { search } from './search.ts';

export async function gymsRoutes(app: fastify.FastifyInstance) {
	app.addHook('onRequest', verifyJWT);

	app.post('/gyms', create);
	app.get('/gyms/search', search);
	app.get('/gyms/nearby', nearBy);
}
