import type fastify from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt.ts';
import { verifyUserRole } from '../../middlewares/verify-user-role.ts';
import { create } from './create.ts';
import { history } from './history.ts';
import { metrics } from './metrics.ts';
import { validate } from './validate.ts';

export async function checkInsRoutes(app: fastify.FastifyInstance) {
	app.addHook('onRequest', verifyJWT);

	app.get('/check-ins/history', history);
	app.get('/check-ins/metrics', metrics);
	app.post('/gyms/:gymId/check-ins', create);
	app.patch(
		'/check-ins/:checkInId/validate',
		{ onRequest: [verifyUserRole('ADMIN')] },
		validate,
	);
}
