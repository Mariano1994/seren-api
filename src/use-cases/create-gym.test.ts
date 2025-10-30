import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGymsRepository } from '../respositories/in-memory-repository/in-memory-gyms-repository.ts';
import { CreateGymUseCase } from './create-gym.ts';

let gymRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Register Use Case ', async () => {
	beforeEach(() => {
		gymRepository = new InMemoryGymsRepository();
		sut = new CreateGymUseCase(gymRepository);
	});

	it('Should be able to regiter a user', async () => {
		const { gym } = await sut.handler({
			title: 'Delson Gym',
			description: 'The best Gym in Lobito',
			phone: null,
			latitude: -12.3469824,
			logitude: 3.5888896,
		});

		expect(gym.id).toEqual(expect.any(String));
	});
});
