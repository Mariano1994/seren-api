import type fastify from 'fastify';

export function verifyUserRole(userRole: 'ADMIN' | 'MEMBER') {
	return async (
		request: fastify.FastifyRequest,
		reply: fastify.FastifyReply,
	) => {
		const { role } = request.user;
		if (role !== userRole) {
			return reply.status(401).send({ message: 'Unauthorized' });
		}
	};
}
