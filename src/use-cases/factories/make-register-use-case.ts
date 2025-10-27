import { PrismaUsersRespository } from '../../respositories/prisma/prisma-users-repository.ts';
import { RegisterUseCase } from '../register-case.ts';

export function makeRegisterUseCase() {
	const usersRespository = new PrismaUsersRespository();
	const registerUseCase = new RegisterUseCase(usersRespository);

	return registerUseCase;
}
