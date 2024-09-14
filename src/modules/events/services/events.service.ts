import { inject, injectable } from 'inversify';
import { TYPES } from '../../../types';
import { IConfigService } from '../../../config/config.service.interface';
import { IEventRepository } from '../repositories/events.repository.interface';
import { EventEntity } from '../models/event.entity';
import { EventCreateDto } from '../dto/event-create.dto';
import { IEventService } from './events.service.interface';
import { IEventEntity } from '../models/event.entity.interface';
import { EventUpdateDto } from '../dto/event-update.dto';

@injectable()
export class EventsService implements IEventService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.EventRepository) private eventRepository: IEventRepository,
	) {}

	async createEvent(params: EventCreateDto): Promise<IEventEntity | null> {
		const newEvent = new EventEntity(
			params.id,
			params.name,
			params.location,
			params.dateStart,
			params.dateEnd,
		);
		const existedEvent = await this.eventRepository.findByLocation(params.location);
		if (existedEvent) {
			return null;
		}
		return await this.eventRepository.create(newEvent);
	}

	async find(): Promise<IEventEntity[]> {
		return await this.eventRepository.find();
	}

	async findById(id: number): Promise<IEventEntity | null> {
		return await this.eventRepository.findById(id);
	}

	async findByLocation(location: string): Promise<IEventEntity | null> {
		return await this.eventRepository.findByLocation(location);
	}

	async update(id: number, params: EventUpdateDto): Promise<IEventEntity | null> {
		const existedEvent = await this.eventRepository.findById(id);
		if (!existedEvent) {
			return null;
		}

		return await this.eventRepository.update(id, params);
	}

	async remove(id: number): Promise<IEventEntity | null> {
		const existedEvent = await this.eventRepository.findById(id);
		if (!existedEvent) {
			return null;
		}
		return await this.eventRepository.remove(id);
	}
}
