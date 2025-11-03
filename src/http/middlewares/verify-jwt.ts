import type fastify from 'fastify';

export async function verifyJWT(
	request: fastify.FastifyRequest,
	reply: fastify.FastifyReply,
) {
	try {
		await request.jwtVerify();
	} catch (_error) {
		return reply.status(401).send({ message: 'Unauthorized' });
	}
}
