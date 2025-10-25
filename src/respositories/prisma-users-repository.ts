import type { Prisma } from '../generated/prisma/client.ts';
import { prisma } from '../lib/prisma.ts';

export class PrismaUsersRespository {
	async create(data: Prisma.UserCreateInput) {
		const user = await prisma.user.create({
			data,
		});

		return user;
	}
}
