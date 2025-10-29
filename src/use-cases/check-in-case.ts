import type { CheckIn } from '../generated/prisma/client.ts';
import type { CheckInRepository } from '../respositories/check-ins-repositories.ts';

interface CheckInUseCaseRequest {
	userId: string;
	gymId: string;
}

interface CheckInUseCaseResponse {
	checkIn: CheckIn;
}

export class CheckInUseCase {
	private checkInRepository: CheckInRepository;

	constructor(checkInRepository: CheckInRepository) {
		this.checkInRepository = checkInRepository;
	}
	async handler({
		userId,
		gymId,
	}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
		const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
			userId,
			new Date(),
		);

		if (checkInOnSameDay) {
			throw new Error();
		}

		const checkIn = await this.checkInRepository.create({
			user_id: userId,
			gym_id: gymId,
		});

		return { checkIn };
	}
}
