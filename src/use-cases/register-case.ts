import { hash } from 'bcryptjs';
import type { UserRepository } from '../respositories/users-repositories.ts';

interface RegisterUseCaseRequest {
	name: string;
	email: string;
	password: string;
}

export class RegisterUseCase {
	private usersRepository: UserRepository;

	constructor(usersRepository: UserRepository) {
		this.usersRepository = usersRepository;
	}

	async handler({ name, email, password }: RegisterUseCaseRequest) {
		const password_hash = await hash(password, 6);

		const existUser = await this.usersRepository.findUserByEmail(email);
		if (existUser) {
			throw new Error('Email already exits');
		}

		await this.usersRepository.create({ name, email, password_hash });
	}
}
