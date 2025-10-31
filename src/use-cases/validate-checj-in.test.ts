import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInRepository } from '../respositories/in-memory-repository/in-memory-check-ins-repository.ts';
import { ResourceNotFoundError } from './erros/resource-not-found-error.ts';
import { ValidateCheckInUseCase } from './validate-check-in.ts';

let checkInRepository: InMemoryCheckInRepository;
let sut: ValidateCheckInUseCase;

describe('Validate Check in use case', async () => {
	beforeEach(() => {
		checkInRepository = new InMemoryCheckInRepository();
		sut = new ValidateCheckInUseCase(checkInRepository);
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
});
