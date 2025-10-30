import type { CheckIn } from '../generated/prisma/client.ts';
import type { CheckInRepository } from '../respositories/check-ins-repository.ts';
import type { GymsRepository } from '../respositories/gyms-repository.ts';
import { getDistanceBetweenCoordinates } from '../utils/get-distance-between-coordinates.ts';
import { ResourceNotFoundError } from './erros/resource-not-found-error.ts';

interface CheckInUseCaseRequest {
	userId: string;
	gymId: string;
	userLatitude: number;
	userLongitude: number;
}

interface CheckInUseCaseResponse {
	checkIn: CheckIn;
}

export class CheckInUseCase {
	private checkInRepository: CheckInRepository;
	private gymRepository: GymsRepository;

	constructor(
		checkInRepository: CheckInRepository,
		gymRepository: GymsRepository,
	) {
		this.checkInRepository = checkInRepository;
		this.gymRepository = gymRepository;
	}
	async handler({
		userId,
		gymId,
		userLatitude,
		userLongitude,
	}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
		const gym = await this.gymRepository.findById(gymId);

		if (!gym) {
			throw new ResourceNotFoundError();
		}

		const distance = getDistanceBetweenCoordinates(
			{
				latitude: userLatitude,
				longitude: userLongitude,
			},
			{ latitude: gym.latitude.toNumber(), longitude: gym.logitude.toNumber() },
		);

		const MAX_DISTANCE_IN_KM = 0.1;

		if (distance > MAX_DISTANCE_IN_KM) {
			throw new Error();
		}

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
