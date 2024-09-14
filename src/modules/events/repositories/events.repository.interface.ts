import { EventUpdateDto } from '../dto/event-update.dto';
import { IEventEntity } from '../models/event.entity.interface';

export interface IEventRepository {
	create: (params: IEventEntity) => Promise<IEventEntity>;
	find: () => Promise<IEventEntity[]>;
	findById: (id: number) => Promise<IEventEntity | null>;
	findByLocation: (location: string) => Promise<IEventEntity | null>;
	update: (id: number, params: IEventEntity) => Promise<IEventEntity | null>;
	remove: (id: number) => Promise<IEventEntity | null>;
}
