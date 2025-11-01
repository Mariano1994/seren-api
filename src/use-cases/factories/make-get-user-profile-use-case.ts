import { PrismaUsersRespository } from '../../respositories/prisma/prisma-users-repository.ts';

import { GetUserProfileUseCase } from '../get-user-profile-case.ts';

export function makeGetUserProfileUseCase() {
	const usersRespository = new PrismaUsersRespository();
	const useCase = new GetUserProfileUseCase(usersRespository);

	return useCase;
}
