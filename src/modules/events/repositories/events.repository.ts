import { inject, injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';
import { IEventRepository } from './events.repository.interface';
import { TYPES } from '../../../types';
import { IEventEntity } from '../models/event.entity.interface';
import { EventUpdateDto } from '../dto/event-update.dto';

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

	async find(): Promise<IEventEntity[]> {
		return await this.eventModel.event.findMany();
	}

	async findById(id: number): Promise<IEventEntity | null> {
		return await this.eventModel.event.findFirst({
			where: {
				id,
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

	async update(id: number, params: IEventEntity): Promise<IEventEntity | null> {
		return await this.eventModel.event.update({
			where: { id },
			data: {
				name: params.name,
				location: params.location,
				dateStart: params.dateStart,
				dateEnd: params.dateEnd,
			},
		});
	}

	async remove(id: number): Promise<IEventEntity | null> {
		return await this.eventModel.event.delete({
			where: { id },
		});
	}
}
