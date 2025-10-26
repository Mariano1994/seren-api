import { compare } from 'bcryptjs';
import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepostory } from '../respositories/in-memory-repository/in-memory-users-repository.ts';
import { RegisterUseCase } from './register-case.ts';

describe('Register Use Case ', async () => {
	it('It should hash user password upon registration', async () => {
		const registerRepository = new InMemoryUsersRepostory();
		const registerUseCase = new RegisterUseCase(registerRepository);

		const { user } = await registerUseCase.handler({
			name: 'marinao',
			email: 'mariano.capiliku@gmail.com',
			password: 'khihdguhdug',
		});

		user.password_hash;

		const isPasswordCorrectlyHashed = await compare(
			'khihdguhdug',
			user.password_hash,
		);

		expect(isPasswordCorrectlyHashed).toBe(true);
	});
});
