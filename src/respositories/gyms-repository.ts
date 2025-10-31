import type { Gym, Prisma } from '../generated/prisma/client.ts';

export interface FindManyNearByParams {
	latitude: number;
	longitude: number;
}
export interface GymsRepository {
	create(data: Prisma.GymCreateInput): Promise<Gym>;
	searchMany(query: string, page: number): Promise<Gym[]>;
	findById(id: string): Promise<Gym | null>;
	findManyNearBy(params: FindManyNearByParams): Promise<Gym[]>;
}
