import { EventCreateDto } from '../dto/event-create.dto';
import { EventUpdateDto } from '../dto/event-update.dto';
import { IEventEntity } from '../models/event.entity.interface';

export interface IEventService {
	createEvent: (params: EventCreateDto) => Promise<IEventEntity | null>;
	find: () => Promise<IEventEntity[]>;
	findById: (id: number) => Promise<IEventEntity | null>;
	findByLocation: (location: string) => Promise<IEventEntity | null>;
	update: (id: number, params: EventUpdateDto) => Promise<IEventEntity | null>;
	remove: (id: number) => Promise<IEventEntity | null>;
}
