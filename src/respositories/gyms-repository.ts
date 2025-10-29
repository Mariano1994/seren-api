import type { Gym } from '../generated/prisma/client.ts';

export interface GymsRepository {
	findById(id: string): Promise<Gym | null>;
}
