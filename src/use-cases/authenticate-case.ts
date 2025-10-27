import { compare } from 'bcryptjs';
import type { User } from '../generated/prisma/client.ts';
import type { UserRepository } from '../respositories/users-repositories.ts';
import { InavlidCredentialsError } from './erros/invalid-credentials-error.ts';

interface AuthenticationUseCasaRequest {
	email: string;
	password: string;
}

interface AuthenticationUseCaseResponse {
	user: User;
}

export class AuthenticateUseCase {
	private userRepository: UserRepository;
	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async handler({
		email,
		password,
	}: AuthenticationUseCasaRequest): Promise<AuthenticationUseCaseResponse> {
		const user = await this.userRepository.findUserByEmail(email);

		if (!user) {
			throw new InavlidCredentialsError();
		}

		const doesPasswordMatches = compare(password, user.password_hash);

		if (!doesPasswordMatches) {
			throw new InavlidCredentialsError();
		}

		return {
			user,
		};
	}
}
