import { inject, injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';
import { IEventRepository } from './events.repository.interface';
import { TYPES } from '../../../types';
import { EventEntity } from '../models/event.entity';
import { IEventEntity } from '../models/event.entity.interface';

@injectable()
export class EventRepository implements IEventRepository {
	constructor(@inject(TYPES.PrismaClient) private eventModel: PrismaClient) {}
	/**
	 * @param eventData
	 * @returns */

	async create(params: IEventEntity): Promise<IEventEntity> {
		return await this.eventModel.event.create({
			data: {
				id: params.id,
				name: params.name,
				location: params.location,
				dateStart: params.dateStart,
				dateEnd: params.dateEnd,
			},
		});
	}

	async findByLocation(location: string): Promise<IEventEntity | null> {
		return await this.eventModel.event.findFirst({
			where: {
				location,
			},
		});
	}
}
