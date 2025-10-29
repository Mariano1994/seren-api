import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInRepository } from '../respositories/in-memory-repository/in-memory-check-ins-repository.ts';
import { CheckInUseCase } from './check-in-case.ts';

let checkInUseCase: InMemoryCheckInRepository;
let sut: CheckInUseCase;

describe('Check in Use Case', () => {
	beforeEach(() => {
		checkInUseCase = new InMemoryCheckInRepository();
		sut = new CheckInUseCase(checkInUseCase);

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('Should be able to check in', async () => {
		vi.setSystemTime(new Date(2025, 4, 13, 12, 0, 0));

		const { checkIn } = await sut.handler({
			userId: 'user-id',
			gymId: 'gym-id',
		});

		console.log({ date: checkIn.created_at });

		expect(checkIn.id).toEqual(expect.any(String));
	});

	it('should not be able to check in twice in the same day', async () => {
		vi.setSystemTime(new Date(2025, 4, 13, 12, 0, 0));

		await sut.handler({
			gymId: 'gym_id',
			userId: 'user_id',
		});

		await expect(
			async () =>
				await sut.handler({
					gymId: 'gym_id',
					userId: 'user_id',
				}),
		).rejects.toBeInstanceOf(Error);
	});

	it('should able to check in twice, but in different days', async () => {
		vi.setSystemTime(new Date(2025, 4, 13, 12, 0, 0));

		await sut.handler({
			gymId: 'gym_id',
			userId: 'user_id',
		});
		vi.setSystemTime(new Date(2025, 4, 20, 12, 0, 0));

		const { checkIn } = await sut.handler({
			gymId: 'gym_id',
			userId: 'user_id',
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});
});
