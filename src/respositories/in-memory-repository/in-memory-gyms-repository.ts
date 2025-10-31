import { randomUUID } from 'node:crypto';
import { type Gym, Prisma } from '../../generated/prisma/client.ts';
import { getDistanceBetweenCoordinates } from '../../utils/get-distance-between-coordinates.ts';
import type {
	FindManyNearByParams,
	GymsRepository,
} from '../gyms-repository.ts';

export class InMemoryGymsRepository implements GymsRepository {
	public items: Gym[] = [];

	async create(data: Prisma.GymCreateInput) {
		const gym = {
			id: data.id ?? randomUUID(),
			title: data.title,
			description: data.description ?? null,
			phone: data.phone ?? null,
			latitude: new Prisma.Decimal(data.latitude.toString()),
			logitude: new Prisma.Decimal(data.logitude.toString()),
			created_at: new Date(),
		};

		this.items.push(gym);

		return gym;
	}

	async findById(id: string) {
		const gym = this.items.find((item) => item.id === id);

		if (!gym) {
			return null;
		}

		return gym;
	}

	async searchMany(query: string, page: number) {
		return this.items
			.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
			.slice((page - 1) * 20, 22);
	}

	async findManyNearBy(params: FindManyNearByParams) {
		return this.items.filter((item) => {
			const distance = getDistanceBetweenCoordinates(
				{
					latitude: params.latitude,
					longitude: params.longitude,
				},
				{
					latitude: item.latitude.toNumber(),
					longitude: item.logitude.toNumber(),
				},
			);

			return distance < 10;
		});
	}
}
