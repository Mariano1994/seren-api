import type { Gym } from '../../generated/prisma/client.ts';
import type { GymCreateInput } from '../../generated/prisma/models.ts';
import { prisma } from '../../lib/prisma.ts';
import type {
	FindManyNearByParams,
	GymsRepository,
} from '../gyms-repository.ts';

export class PrismasGymsRepository implements GymsRepository {
	async create(data: GymCreateInput) {
		const gym = prisma.gym.create({
			data,
		});

		return gym;
	}
	async searchMany(query: string, page: number) {
		const gyms = prisma.gym.findMany({
			where: {
				title: {
					contains: query,
				},
			},
			take: 20,
			skip: (page - 1) * 20,
		});

		return gyms;
	}
	async findById(id: string) {
		const gym = prisma.gym.findUnique({
			where: {
				id,
			},
		});

		return gym;
	}
	async findManyNearBy({ latitude, longitude }: FindManyNearByParams) {
		const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    
    `;

		return gyms;
	}
}
