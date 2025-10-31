import type { Gym } from '../generated/prisma/client.ts';
import type { GymsRepository } from '../respositories/gyms-repository.ts';

type FetchNeaByGymsUseCaseRequest = {
	userLatitude: number;
	userLongitude: number;
};

interface FecthNearByGymsUseCaseResponse {
	gyms: Gym[];
}

export class FetchNearByGymsUseCase {
	private gymsRepository: GymsRepository;

	constructor(gymRepository: GymsRepository) {
		this.gymsRepository = gymRepository;
	}

	async handler({
		userLatitude,
		userLongitude,
	}: FetchNeaByGymsUseCaseRequest): Promise<FecthNearByGymsUseCaseResponse> {
		const gyms = await this.gymsRepository.findManyNearBy({
			latitude: userLatitude,
			longitude: userLongitude,
		});

		return {
			gyms,
		};
	}
}
