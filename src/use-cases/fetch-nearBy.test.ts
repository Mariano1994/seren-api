import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGymsRepository } from '../respositories/in-memory-repository/in-memory-gyms-repository.ts';
import { FetchNearByGymsUseCase } from './fetch-nearBy-gyms.ts';

let gymRepository: InMemoryGymsRepository;
let sut: FetchNearByGymsUseCase;

describe('Fetch Near By Gym Use Case', async () => {
	beforeEach(() => {
		gymRepository = new InMemoryGymsRepository();
		sut = new FetchNearByGymsUseCase(gymRepository);
	});

	it('should be able to fetch near by gyms', async () => {
		await gymRepository.create({
			title: 'Near Gym',
			description: 'The best Gym in Lobito',
			phone: null,
			latitude: -12.3469824,
			logitude: 3.5888896,
		});

		await gymRepository.create({
			title: 'Far Gym',
			description: 'The best Gym in Lobito',
			phone: null,
			latitude: -11.9625405,
			logitude: 13.763144,
		});

		const { gyms } = await sut.handler({
			userLatitude: -12.3469824,
			userLongitude: 3.5888896,
		});

		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })]);
	});
});
