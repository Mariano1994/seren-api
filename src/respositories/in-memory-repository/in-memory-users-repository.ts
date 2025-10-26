import type { User } from '../../generated/prisma/client.ts';
import type { UserCreateInput } from '../../generated/prisma/models.ts';
import type { UserRepository } from '../users-repositories.ts';

export class InMemoryUsersRepostory implements UserRepository {
	public items: User[] = [];

	async findUserByEmail(email: string) {
		const user = this.items.find((item) => item.email === email);

		if (!user) {
			return null;
		}

		return user;
	}

	async create(data: UserCreateInput) {
		const user = {
			id: '9385kje',
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			created_at: new Date(),
		};

		this.items.push(user);

		return user;
	}
}
