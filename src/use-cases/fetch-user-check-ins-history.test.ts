import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInRepository } from '../respositories/in-memory-repository/in-memory-check-ins-repository.ts';
import { FetchUserCheckInsUseCase } from './fetch-user-check-ins-history.ts';

let checkInsRespository: InMemoryCheckInRepository;
let sut: FetchUserCheckInsUseCase;

describe('Fecth user check ins history', async () => {
	beforeEach(async () => {
		checkInsRespository = new InMemoryCheckInRepository();
		sut = new FetchUserCheckInsUseCase(checkInsRespository);
	});

	it('should be able to fetch user check ins history', async () => {
		await checkInsRespository.create({
			gym_id: 'gym-01',
			user_id: 'user_user',
		});

		await checkInsRespository.create({
			gym_id: 'gym-02',
			user_id: 'user_user',
		});

		const { checkIns } = await sut.handler({
			userId: 'user_user',
			page: 1,
		});

		expect(checkIns).toHaveLength(2);
		expect(checkIns).toEqual([
			expect.objectContaining({ gym_id: 'gym-01' }),
			expect.objectContaining({ gym_id: 'gym-02' }),
		]);
	});

	it('should be able to fetch paginated user check ins history', async () => {
		for (let i = 1; i <= 22; i++) {
			await checkInsRespository.create({
				gym_id: `gym-${i}`,
				user_id: 'user_user',
			});
		}

		const { checkIns } = await sut.handler({
			userId: 'user_user',
			page: 2,
		});

		expect(checkIns).toHaveLength(2);
		expect(checkIns).toEqual([
			expect.objectContaining({ gym_id: 'gym-21' }),
			expect.objectContaining({ gym_id: 'gym-22' }),
		]);
	});
});
