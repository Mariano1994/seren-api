import { compare } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepostory } from '../respositories/in-memory-repository/in-memory-users-repository.ts';
import { UserAlreadyExistsError } from './erros/user-already-exists-error.ts';
import { RegisterUseCase } from './register-case.ts';

let userRepository: InMemoryUsersRepostory;
let sut: RegisterUseCase;

describe('Register Use Case ', async () => {
	beforeEach(() => {
		userRepository = new InMemoryUsersRepostory();
		sut = new RegisterUseCase(userRepository);
	});

	it('Should be able to regiter a user', async () => {
		const { user } = await sut.handler({
			name: 'marinao',
			email: 'mariano.capiliku@gmail.com',
			password: 'khihdguhdug',
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('It should hash user password upon registration', async () => {
		const { user } = await sut.handler({
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
		const email = 'mariano@gmail.com';

		await sut.handler({
			name: 'mariano',
			email,
			password: '123433546',
		});

		await expect(async () => {
			await sut.handler({
				name: 'mariano',
				email,
				password: '123433546',
			});
		}).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});
});
