import type { Gym, Prisma } from '../generated/prisma/client.ts';

export interface GymsRepository {
	create(data: Prisma.GymCreateInput): Promise<Gym>;
	findById(id: string): Promise<Gym | null>;
}
