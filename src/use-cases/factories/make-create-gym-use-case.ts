import { PrismasGymsRepository } from '../../respositories/prisma/prisma-gyms-repository.ts';
import { CreateGymUseCase } from '../create-gym.ts';

export function makeCreateGymUseCase() {
	const gymsRepository = new PrismasGymsRepository();
	const useCase = new CreateGymUseCase(gymsRepository);

	return useCase;
}
