import type { CheckIn, Prisma } from '../generated/prisma/client.ts';

export interface CheckInRepository {
	create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
	findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
	findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
	countByUserId(userId: string): Promise<number>;
	findCheckInById(checkinId: string): Promise<CheckIn | null>;
	saveCheckIn(checkIn: CheckIn): Promise<CheckIn>;
}
