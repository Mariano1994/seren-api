import type fastify from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt.ts';
import { verifyUserRole } from '../../middlewares/verify-user-role.ts';
import { create } from './create.ts';
import { nearBy } from './nearBy.ts';
import { search } from './search.ts';

export async function gymsRoutes(app: fastify.FastifyInstance) {
	app.addHook('onRequest', verifyJWT);

	app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create);
	app.get('/gyms/search', search);
	app.get('/gyms/nearby', nearBy);
}
