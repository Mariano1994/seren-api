import { PrismasGymsRepository } from '../../respositories/prisma/prisma-gyms-repository.ts';
import { FetchNearByGymsUseCase } from '../fetch-nearBy-gyms.ts';

export function makeFetchNearByGymUseCase() {
	const gymsRepository = new PrismasGymsRepository();
	const useCase = new FetchNearByGymsUseCase(gymsRepository);

	return useCase;
}
