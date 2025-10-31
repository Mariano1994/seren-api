import type { CheckInRepository } from '../respositories/check-ins-repository.ts';

interface GetUserMetricsUseCaseRequest {
	userId: string;
}

interface GetUserMetricsUseCaseReponse {
	checksInsCount: number;
}

export class GetUserMetricsUseCase {
	private checkInRepository: CheckInRepository;

	constructor(checkInRepository: CheckInRepository) {
		this.checkInRepository = checkInRepository;
	}

	async handler({
		userId,
	}: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseReponse> {
		const checksInsCount = await this.checkInRepository.countByUserId(userId);

		return {
			checksInsCount,
		};
	}
}
