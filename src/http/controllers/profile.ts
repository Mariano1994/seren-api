import type fastify from 'fastify';

export async function profile(
	request: fastify.FastifyRequest,
	reply: fastify.FastifyReply,
) {
	await request.jwtVerify();

	console.log(request.user.sub);
	console.log(request.headers.authorization);
	return reply.status(200).send();
}
