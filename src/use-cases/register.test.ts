import { compare } from 'bcryptjs';
import { describe, expect, it } from 'vitest';

import { RegisterUseCase } from './register-case.ts';

describe('Register Use Case ', async () => {
	it('It should hash user password upon registration', async () => {
		const registerUseCase = new RegisterUseCase({
			async findUserByEmail(email) {
				return null;
			},

			async create(data) {
				return {
					id: '9385kje',
					name: data.name,
					email: data.email,
					password_hash: data.password_hash,
					created_at: new Date(),
				};
			},
		});

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
