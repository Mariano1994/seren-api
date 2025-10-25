import { hash } from 'bcryptjs';
import { prisma } from '../lib/prisma.ts';
import { PrismaUsersRespository } from '../respositories/prisma-users-repository.ts';

interface RegisterUseCaseRequest {
	name: string;
	email: string;
	password: string;
}

export async function registerUseCase({
	name,
	email,
	password,
}: RegisterUseCaseRequest) {
	const password_hash = await hash(password, 6);

	const existUser = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (existUser) {
		throw new Error('Email already exits');
	}

	const PrismaUsersRepository = new PrismaUsersRespository();

	await PrismaUsersRepository.create({ name, email, password_hash });
}
