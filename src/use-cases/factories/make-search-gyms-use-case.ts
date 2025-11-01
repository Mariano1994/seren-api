import { PrismasGymsRepository } from '../../respositories/prisma/prisma-gyms-repository.ts';
import { SearchGymUseCase } from '../search-gym.ts';

export function makeSearchGymsUseCase() {
	const gymsRepository = new PrismasGymsRepository();
	const useCase = new SearchGymUseCase(gymsRepository);

	return useCase;
}
