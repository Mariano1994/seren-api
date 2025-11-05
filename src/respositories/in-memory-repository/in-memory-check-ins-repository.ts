import { randomUUID } from 'node:crypto';
import dayjs from 'dayjs';
import type { CheckIn, Prisma } from '../../generated/prisma/client.ts';
import type { CheckInRepository } from '../check-ins-repository.ts';

export class InMemoryCheckInRepository implements CheckInRepository {
	public items: CheckIn[] = [];

	async countByUserId(userId: string) {
		const countCheckIns = this.items.filter(
			(item) => item.user_id === userId,
		).length;

		return countCheckIns;
	}

	async findManyByUserId(userId: string, page: number) {
		return this.items
			.filter((item) => item.user_id === userId)
			.slice((page - 1) * 20, 22);
	}

	async findByUserIdOnDate(userId: string, date: Date) {
		const startOfTheDay = dayjs(date).startOf('date');
		const endOfTheDay = dayjs(date).endOf('date');

		const checkInOnSameDate = this.items.find((checkIn) => {
			const checkInDate = dayjs(checkIn.created_at);

			const isOnSameDate =
				checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

			return checkIn.user_id === userId && isOnSameDate;
		});

		if (!checkInOnSameDate) return null;

		return checkInOnSameDate;
	}

	async findCheckInById(checkinId: string) {
		const checkIn = this.items.find((item) => item.id === checkinId);

		if (!checkIn) return null;

		return checkIn;
	}

	async create(data: Prisma.CheckInUncheckedCreateInput) {
		const checkIn = {
			id: randomUUID(),
			created_at: new Date(),
			validated_at: data.validated_at ? new Date(data.validated_at) : null,
			user_id: data.user_id,
			gym_id: data.gym_id,
		};

		this.items.push(checkIn);

		return checkIn;
	}

	async saveCheckIn(checkIn: CheckIn) {
		const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id);

		if (checkInIndex >= 0) {
			this.items[checkInIndex] = checkIn;
		}

		return checkIn;
	}
}
