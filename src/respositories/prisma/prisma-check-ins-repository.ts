import dayjs from 'dayjs';
import type { CheckIn } from '../../generated/prisma/client.ts';
import type { CheckInUncheckedCreateInput } from '../../generated/prisma/models.ts';
import { prisma } from '../../lib/prisma.ts';
import type { CheckInRepository } from '../check-ins-repository.ts';

export class PrismaCheckInsRepository implements CheckInRepository {
	async create(data: CheckInUncheckedCreateInput) {
		const checkIn = await prisma.checkIn.create({
			data,
		});

		return checkIn;
	}

	async findByUserIdOnDate(userId: string, date: Date) {
		const startOfTheDay = dayjs(date).startOf('date');
		const endOfTheDay = dayjs(date).endOf('date');

		const checkIn = await prisma.checkIn.findFirst({
			where: {
				user_id: userId,
				created_at: {
					gte: startOfTheDay.toDate(),
					lte: endOfTheDay.toDate(),
				},
			},
		});

		return checkIn;
	}

	async findManyByUserId(userId: string, page: number) {
		const checkIns = await prisma.checkIn.findMany({
			where: {
				user_id: userId,
			},
			take: 20,
			skip: page - 1 * 20,
		});

		return checkIns;
	}

	async countByUserId(userId: string) {
		const count = await prisma.checkIn.count({
			where: {
				user_id: userId,
			},
		});

		return count;
	}
	async findCheckInById(id: string) {
		const checkIn = await prisma.checkIn.findUnique({
			where: {
				id,
			},
		});

		return checkIn;
	}
	async saveCheckIn(data: CheckIn): Promise<CheckIn> {
		const checkIn = await prisma.checkIn.update({
			where: {
				id: data.id,
			},
			data,
		});

		return checkIn;
	}
}
