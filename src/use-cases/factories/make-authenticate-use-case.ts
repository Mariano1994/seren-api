import { PrismaUsersRespository } from '../../respositories/prisma/prisma-users-repository.ts';
import { AuthenticateUseCase } from '../authenticate-case.ts';

export function makeAuthenticateUseCase() {
	const usersRespository = new PrismaUsersRespository();
	const authenticateUseCase = new AuthenticateUseCase(usersRespository);

	return authenticateUseCase;
}
