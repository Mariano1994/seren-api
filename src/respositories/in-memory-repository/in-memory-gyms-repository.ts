import type { Gym } from '../../generated/prisma/client.ts';
import type { GymsRepository } from '../gyms-repository.ts';

export class InMemoryGymsRepository implements GymsRepository {
	public items: Gym[] = [];

	async findById(id: string) {
		const gym = this.items.find((item) => item.id === id);

		if (!gym) {
			return null;
		}

		return gym;
	}
}
