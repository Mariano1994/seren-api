import type { Prisma, User } from '../generated/prisma/client.ts';

export interface UserRepository {
	// findUserByEmail(email: string): Promise<User | null>;
	create(data: Prisma.UserCreateInput): Promise<User>;
}
