import type { Prisma } from '../../generated/prisma/client.ts';
import { prisma } from '../../lib/prisma.ts';
import type { UserRepository } from '../users-repositories.ts';

export class PrismaUsersRespository implements UserRepository {
	async findUserByEmail(email: string) {
		const userExists = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		return userExists;
	}
	async create(data: Prisma.UserCreateInput) {
		const user = await prisma.user.create({
			data,
		});

		return user;
	}
}
