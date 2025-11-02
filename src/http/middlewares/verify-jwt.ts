import type fastify from 'fastify';

export async function VerifyJWT(
	request: fastify.FastifyRequest,
	reply: fastify.FastifyReply,
) {
	try {
		await request.jwtVerify();
	} catch (error) {
		return reply.status(401).send({ message: 'Unauthorized' });
	}
}
