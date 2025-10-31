import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInRepository } from '../respositories/in-memory-repository/in-memory-check-ins-repository.ts';
import { LateCheckInValidationError } from './erros/late-check-in-validation-error.ts';
import { ResourceNotFoundError } from './erros/resource-not-found-error.ts';
import { ValidateCheckInUseCase } from './validate-check-in.ts';

let checkInRepository: InMemoryCheckInRepository;
let sut: ValidateCheckInUseCase;

describe('Validate Check in use case', async () => {
	beforeEach(async () => {
		checkInRepository = new InMemoryCheckInRepository();
		sut = new ValidateCheckInUseCase(checkInRepository);

		vi.useFakeTimers();
	});

	afterEach(async () => {
		vi.useRealTimers();
	});

	it('should be able to validate the check-in', async () => {
		const createdCheckIn = await checkInRepository.create({
			user_id: 'user-01',
			gym_id: 'gym-id',
		});

		const { checkIn } = await sut.handler({
			checkInId: createdCheckIn.id,
		});

		expect(checkIn.validated_at).toEqual(expect.any(Date));
		expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date));
	});

	it('should not be able to validate an inexistent check-in', async () => {
		await expect(async () => {
			await sut.handler({
				checkInId: 'inexistent-checkinId',
			});
		}).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
		vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

		const createdCheckIn = await checkInRepository.create({
			user_id: 'user-01',
			gym_id: 'gym-id',
		});

		const twentyOneMinutensInMS = 1000 * 60 * 21;
		vi.advanceTimersByTime(twentyOneMinutensInMS);

		await expect(async () => {
			await sut.handler({
				checkInId: createdCheckIn.id,
			});
		}).rejects.toBeInstanceOf(LateCheckInValidationError);
	});
});
