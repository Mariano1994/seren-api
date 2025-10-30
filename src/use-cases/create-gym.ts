import type { Gym } from '../generated/prisma/client.ts';
import type { GymsRepository } from '../respositories/gyms-repository.ts';

interface CreateGymUseCaseRequest {
	title: string;
	description: string | null;
	phone: string | null;
	latitude: number;
	logitude: number;
}

interface CreateGymUseCaseResponse {
	gym: Gym;
}

export class CreateGymUseCase {
	private gymRepository: GymsRepository;

	constructor(gymRepository: GymsRepository) {
		this.gymRepository = gymRepository;
	}

	async handler({
		title,
		description,
		phone,
		latitude,
		logitude,
	}: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
		const gym = await this.gymRepository.create({
			title,
			description,
			phone,
			latitude,
			logitude,
		});

		return { gym };
	}
}
