import { EventCreateDto } from '../dto/event-create.dto';
import { IEventEntity } from '../models/event.entity.interface';

export interface IEventService {
	createEvent: (params: EventCreateDto) => Promise<IEventEntity | null>;
}
