import type { CheckIn } from '../generated/prisma/client.ts';
import type { CheckInRepository } from '../respositories/check-ins-repository.ts';

interface FetchUserCheckInsUseCaseRequest {
	userId: string;
}

interface FetchUserCheckInsUseCaseResponse {
	checkIns: CheckIn[];
}

export class FetchUserCheckInsUseCase {
	private checkInRepository: CheckInRepository;

	constructor(checkInRepository: CheckInRepository) {
		this.checkInRepository = checkInRepository;
	}

	async handler({
		userId,
	}: FetchUserCheckInsUseCaseRequest): Promise<FetchUserCheckInsUseCaseResponse> {
		const checkIns = await this.checkInRepository.findManyByUserId(userId);

		return { checkIns };
	}
}
