import { compare } from 'bcryptjs';
import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepostory } from '../respositories/in-memory-repository/in-memory-users-repository.ts';
import { UserAlreadyExistsError } from './erros/user-already-exists-error.ts';
import { RegisterUseCase } from './register-case.ts';

describe('Register Use Case ', async () => {
	it('Should be able to regiter a user', async () => {
		const userRepository = new InMemoryUsersRepostory();
		const registerUseCase = new RegisterUseCase(userRepository);

		const { user } = await registerUseCase.handler({
			name: 'marinao',
			email: 'mariano.capiliku@gmail.com',
			password: 'khihdguhdug',
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('It should hash user password upon registration', async () => {
		const usersRepository = new InMemoryUsersRepostory();
		const registerUseCase = new RegisterUseCase(usersRepository);

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

	it('Should not be able to register with same e-mail twice', async () => {
		const userRepository = new InMemoryUsersRepostory();
		const registerUseCase = new RegisterUseCase(userRepository);

		const email = 'mariano@gmail.com';

		await registerUseCase.handler({
			name: 'mariano',
			email,
			password: '123433546',
		});

		await expect(async () => {
			await registerUseCase.handler({
				name: 'mariano',
				email,
				password: '123433546',
			});
		}).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});
});
