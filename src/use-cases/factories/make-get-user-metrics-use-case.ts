import { PrismaCheckInsRepository } from '../../respositories/prisma/prisma-check-ins-repository.ts';
import { GetUserMetricsUseCase } from '../get-user-metrics.ts';

export function makeGetUserMetricsUseCase() {
	const checkInsRepository = new PrismaCheckInsRepository();
	const useCase = new GetUserMetricsUseCase(checkInsRepository);

	return useCase;
}
