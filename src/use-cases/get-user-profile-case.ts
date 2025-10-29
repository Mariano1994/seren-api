import type { User } from '../generated/prisma/client.ts';
import type { UserRepository } from '../respositories/users-repository.ts';

import { ResourceNotFoundError } from './erros/resource-not-found-error.ts';

interface GetUserProfileUseCaseRequest {
	userId: string;
}

interface GetUserProfileUseCaseResponse {
	user: User;
}

export class GetUserProfileUseCase {
	private userRepository: UserRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async handler({
		userId,
	}: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
		const user = await this.userRepository.findUserById(userId);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		return {
			user,
		};
	}
}
