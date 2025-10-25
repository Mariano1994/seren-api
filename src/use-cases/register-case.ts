import { hash } from 'bcryptjs';
import { prisma } from '../lib/prisma.ts';

interface RegisterUseCaseRequest {
	name: string;
	email: string;
	password: string;
}

export class RegisterUseCase {
	constructor(private usersRepository: any) {}

	async handler({ name, email, password }: RegisterUseCaseRequest) {
		const password_hash = await hash(password, 6);

		const existUser = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (existUser) {
			throw new Error('Email already exits');
		}

		await this.usersRepository.create({ name, email, password_hash });
	}
}
