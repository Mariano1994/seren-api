import type fastify from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt.ts';

export async function gymsRoutes(app: fastify.FastifyInstance) {
	app.addHook('onRequest', verifyJWT);
}
