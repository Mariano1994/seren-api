import type { CheckIn } from '../generated/prisma/client.ts';
import type { CheckInRepository } from '../respositories/check-ins-repository.ts';
import { ResourceNotFoundError } from './erros/resource-not-found-error.ts';

interface ValidateCheckInUseCaseRequest {
	checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
	checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
	private checkInRepository: CheckInRepository;

	constructor(checkInRepository: CheckInRepository) {
		this.checkInRepository = checkInRepository;
	}

	async handler({
		checkInId,
	}: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
		const checkIn = await this.checkInRepository.findCheckInById(checkInId);

		if (!checkIn) {
			throw new ResourceNotFoundError();
		}

		checkIn.validated_at = new Date();

		await this.checkInRepository.saveCheckIn(checkIn);

		return {
			checkIn,
		};
	}
}
