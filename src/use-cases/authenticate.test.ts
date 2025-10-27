import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepostory } from '../respositories/in-memory-repository/in-memory-users-repository.ts';
import { AuthenticateUseCase } from './authenticate-case.ts';
import { InvalidCredentialsError } from './erros/invalid-credentials-error.ts';

let userRepository: InMemoryUsersRepostory;
let sut: AuthenticateUseCase;

describe('Autheticate Use Case', async () => {
	beforeEach(() => {
		userRepository = new InMemoryUsersRepostory();
		// sut => System Under Test
		sut = new AuthenticateUseCase(userRepository);
	});

	it('Should able to authenticate the use', async () => {
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
		await expect(async () => {
			await sut.handler({
				email: 'mariocapiliku@gmail.com',
				password: '123456',
			});
		}).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it('Should not be able to authenticate with a wrong password', async () => {
		await userRepository.create({
			name: 'John Doe',
			email: 'john.doe@gmail.com',
			password_hash: await hash('123456', 6),
		});

		await expect(async () => {
			await sut.handler({
				email: 'john.doe@gmail.com',
				password: '123456375',
			});
		}).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});
