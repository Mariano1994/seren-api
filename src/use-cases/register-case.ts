import { hash } from 'bcryptjs';
import type { User } from '../generated/prisma/client.ts';
import type { UserRepository } from '../respositories/users-repositories.ts';
import { UserAlreadyExistsError } from './erros/user-already-exists-error.ts';

interface RegisterUseCaseRequest {
	name: string;
	email: string;
	password: string;
}

interface RegisterUseCaseResponse {
	user: User;
}

export class RegisterUseCase {
	private usersRepository: UserRepository;

	constructor(usersRepository: UserRepository) {
		this.usersRepository = usersRepository;
	}

	async handler({
		name,
		email,
		password,
	}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
		const password_hash = await hash(password, 6);

		const existUser = await this.usersRepository.findUserByEmail(email);

		if (existUser) {
			throw new UserAlreadyExistsError();
		}

		const user = await this.usersRepository.create({
			name,
			email,
			password_hash,
		});

		return { user };
	}
}
