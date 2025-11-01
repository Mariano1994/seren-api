import { PrismaCheckInsRepository } from '../../respositories/prisma/prisma-check-ins-repository.ts';
import { PrismasGymsRepository } from '../../respositories/prisma/prisma-gyms-repository.ts';
import { CheckInUseCase } from '../check-in-case.ts';

export function makeCheckInUseCase() {
	const checkInsRepository = new PrismaCheckInsRepository();
	const gymsRepository = new PrismasGymsRepository();
	const useCase = new CheckInUseCase(checkInsRepository, gymsRepository);

	return useCase;
}
