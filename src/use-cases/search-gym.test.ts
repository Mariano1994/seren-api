import { waitForDebugger } from 'inspector';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGymsRepository } from '../respositories/in-memory-repository/in-memory-gyms-repository.ts';
import { SearchGymUseCase } from './search-gym.ts';

let gymRepository: InMemoryGymsRepository;
let sut: SearchGymUseCase;

describe('Search Gym Use Case', async () => {
	beforeEach(() => {
		gymRepository = new InMemoryGymsRepository();
		sut = new SearchGymUseCase(gymRepository);
	});

	it('should be able to searh for gyms', async () => {
		await gymRepository.create({
			title: 'Delson Gym',
			description: 'The best Gym in Lobito',
			phone: null,
			latitude: -12.3469824,
			logitude: 3.5888896,
		});

		await gymRepository.create({
			title: 'Lobito Gym',
			description: 'The best Gym in Lobito',
			phone: null,
			latitude: -12.3469824,
			logitude: 3.5888896,
		});

		const { gyms } = await sut.handler({
			query: 'lobito',
			page: 1,
		});

		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([expect.objectContaining({ title: 'Lobito Gym' })]);
	});

	it('should be able to fecth paginated gyms search', async () => {
		for (let i = 1; i <= 22; i++) {
			await gymRepository.create({
				title: `Lobito Gym ${i}`,
				description: 'The best Gym in Lobito',
				phone: null,
				latitude: -12.3469824,
				logitude: 3.5888896,
			});
		}

		const { gyms } = await sut.handler({
			query: 'lobito',
			page: 2,
		});

		expect(gyms).toHaveLength(2);
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'Lobito Gym 21' }),
			expect.objectContaining({ title: 'Lobito Gym 22' }),
		]);
	});
});
