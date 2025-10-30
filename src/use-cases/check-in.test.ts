import { Decimal } from '@prisma/client/runtime/library';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInRepository } from '../respositories/in-memory-repository/in-memory-check-ins-repository.ts';
import { InMemoryGymsRepository } from '../respositories/in-memory-repository/in-memory-gyms-repository.ts';
import { CheckInUseCase } from './check-in-case.ts';
import { MaxDistanceError } from './erros/max-distance-error.ts';
import { MaxNumbetrOfCheckError } from './erros/max-numbers-of-check-ins-error.ts';

let checkInUseCase: InMemoryCheckInRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check in Use Case', () => {
	beforeEach(async () => {
		checkInUseCase = new InMemoryCheckInRepository();
		gymsRepository = new InMemoryGymsRepository();
		sut = new CheckInUseCase(checkInUseCase, gymsRepository);

		await gymsRepository.create({
			id: 'gym_id',
			title: 'DelsonGym',
			description: ' ',
			phone: '',
			latitude: -12.3469824,
			logitude: 3.5888896,
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
		).rejects.toBeInstanceOf(MaxNumbetrOfCheckError);
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

	it('should not be able to check in on distant gym', async () => {
		gymsRepository.items.push({
			id: 'gym_id_02',
			title: 'DelsonGym',
			description: ' ',
			phone: '',
			latitude: new Decimal(-12.2757041),
			logitude: new Decimal(13.8353953),
		});

		expect(async () => {
			await sut.handler({
				gymId: 'gym_id_02',
				userId: 'user_id',
				userLatitude: -12.3469824,
				userLongitude: 3.5888896,
			});
		}).rejects.toBeInstanceOf(MaxDistanceError);
	});
});
