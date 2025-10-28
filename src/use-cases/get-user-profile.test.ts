import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepostory } from '../respositories/in-memory-repository/in-memory-users-repository.ts';
import { ResourceNotFoundError } from './erros/resource-not-found-error.ts';
import { GetUserProfileUseCase } from './get-user-profile-case.ts';

let userRepository: InMemoryUsersRepostory;
let sut: GetUserProfileUseCase;

describe('User Profile Use Case', async () => {
	beforeEach(() => {
		userRepository = new InMemoryUsersRepostory();
		sut = new GetUserProfileUseCase(userRepository);
	});

	it('Should able to get user profile', async () => {
		const createdUser = await userRepository.create({
			name: 'John Doe',
			email: 'john.doe@gmail.com',
			password_hash: await hash('123456', 6),
		});
		const { user } = await sut.handler({
			userId: createdUser.id,
		});
		expect(user.name).toEqual('John Doe');
	});

	it('Should not able to get user profile with a wrong id', async () => {
		await userRepository.create({
			name: 'John Doe',
			email: 'john.doe@gmail.com',
			password_hash: await hash('123456', 6),
		});

		await expect(async () => {
			await sut.handler({
				userId: 'not-exiting-id',
			});
		}).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
