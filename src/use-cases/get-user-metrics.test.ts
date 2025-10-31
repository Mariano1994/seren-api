import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInRepository } from '../respositories/in-memory-repository/in-memory-check-ins-repository.ts';
import { GetUserMetricsUseCase } from './get-user-metrics.ts';

let checkInRepository: InMemoryCheckInRepository;
let sut: GetUserMetricsUseCase;

describe('Get user metrics use case', async () => {
	beforeEach(() => {
		checkInRepository = new InMemoryCheckInRepository();
		sut = new GetUserMetricsUseCase(checkInRepository);
	});

	it('should get the number of check ins from a particular user', async () => {
		for (let i = 1; i <= 5; i++) {
			await checkInRepository.create({
				user_id: 'user_id',
				gym_id: 'gym_id',
			});
		}

		const { checksInsCount } = await sut.handler({
			userId: 'user_id',
		});

		expect(checksInsCount).toEqual(5);
	});
});
