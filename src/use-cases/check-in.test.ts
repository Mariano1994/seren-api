import { Decimal } from '@prisma/client/runtime/library';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInRepository } from '../respositories/in-memory-repository/in-memory-check-ins-repository.ts';
import { InMemoryGymsRepository } from '../respositories/in-memory-repository/in-memory-gyms-repository.ts';
import { CheckInUseCase } from './check-in-case.ts';

let checkInUseCase: InMemoryCheckInRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check in Use Case', () => {
	beforeEach(() => {
		checkInUseCase = new InMemoryCheckInRepository();
		gymsRepository = new InMemoryGymsRepository();
		sut = new CheckInUseCase(checkInUseCase, gymsRepository);

		gymsRepository.items.push({
			id: 'gym_id',
			title: 'DelsonGym',
			description: ' ',
			phone: '',
			latitude: new Decimal(0),
			logitude: new Decimal(0),
		});
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('Should be able to check in', async () => {
		vi.setSystemTime(new Date(2025, 4, 13, 12, 0, 0));

		const { checkIn } = await sut.handler({
			userId: 'user_id',
			gymId: 'gym_id',
			userLatitude: -12.3469824,
			userLongitude: 3.5888896,
		});

		console.log({ date: checkIn.created_at });

		expect(checkIn.id).toEqual(expect.any(String));
	});

	it('should not be able to check in twice in the same day', async () => {
		vi.setSystemTime(new Date(2025, 4, 13, 12, 0, 0));

		await sut.handler({
			gymId: 'gym_id',
			userId: 'user_id',
			userLatitude: -12.3469824,
			userLongitude: 3.5888896,
		});

		await expect(
			async () =>
				await sut.handler({
					gymId: 'gym_id',
					userId: 'user_id',
					userLatitude: -12.3469824,
					userLongitude: 3.5888896,
				}),
		).rejects.toBeInstanceOf(Error);
	});

	it('should able to check in twice, but in different days', async () => {
		vi.setSystemTime(new Date(2025, 4, 13, 12, 0, 0));

		await sut.handler({
			gymId: 'gym_id',
			userId: 'user_id',
			userLatitude: -12.3469824,
			userLongitude: 3.5888896,
		});
		vi.setSystemTime(new Date(2025, 4, 20, 12, 0, 0));

		const { checkIn } = await sut.handler({
			gymId: 'gym_id',
			userId: 'user_id',
			userLatitude: -12.3469824,
			userLongitude: 3.5888896,
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});
});
