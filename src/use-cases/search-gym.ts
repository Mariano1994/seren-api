import type { Gym } from '../generated/prisma/client.ts';
import type { GymsRepository } from '../respositories/gyms-repository.ts';

interface SearchGymUseCaseRequest {
	query: string;
	page: number;
}

interface SearchGymUseCaseResponse {
	gyms: Gym[];
}

export class SearchGym {
	private gymsRepository: GymsRepository;

	constructor(gymsRepository: GymsRepository) {
		this.gymsRepository = gymsRepository;
	}

	async handler({
		query,
		page,
	}: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
		const gyms = await this.gymsRepository.searchMany(query, page);

		return {
			gyms,
		};
	}
}
