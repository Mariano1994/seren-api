import { hash } from 'bcryptjs';
import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepostory } from '../respositories/in-memory-repository/in-memory-users-repository.ts';
import { AuthenticateUseCase } from './authenticate-case.ts';
import { InvalidCredentialsError } from './erros/invalid-credentials-error.ts';

describe('Autheticate Use Case', async () => {
	it('Should able to authenticate the use', async () => {
		const userRepository = new InMemoryUsersRepostory();

		// sut => System Under Test
		const sut = new AuthenticateUseCase(userRepository);

		await userRepository.create({
			name: 'John Doe',
			email: 'john.doe@gmail.com',
			password_hash: await hash('123456', 6),
		});

		const { user } = await sut.handler({
			email: 'john.doe@gmail.com',
			password: '123456',
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('Should not be able to authenticate with a wrong email', async () => {
		const userRepository = new InMemoryUsersRepostory();
		const suit = new AuthenticateUseCase(userRepository);

		await expect(async () => {
			await suit.handler({
				email: 'mariocapiliku@gmail.com',
				password: '123456',
			});
		}).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it('Should not be able to authenticate with a wrong password', async () => {
		const userRepository = new InMemoryUsersRepostory();
		const sut = new AuthenticateUseCase(userRepository);

		const user = await userRepository.create({
			name: 'John Doe',
			email: 'john.doe@gmail.com',
			password_hash: await hash('123456', 6),
		});

		console.log(user);

		await expect(async () => {
			await sut.handler({
				email: 'john.doe@gmail.com',
				password: '123456375',
			});
		}).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});
