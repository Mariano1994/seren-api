import { PrismaCheckInsRepository } from '../../respositories/prisma/prisma-check-ins-repository.ts';
import { FetchUserCheckInsUseCase } from '../fetch-user-check-ins-history.ts';

export function makeFetchUserCheckInsHistoryUseCase() {
	const checkInsRepository = new PrismaCheckInsRepository();
	const useCase = new FetchUserCheckInsUseCase(checkInsRepository);

	return useCase;
}
