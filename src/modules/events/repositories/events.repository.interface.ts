import { EventEntity } from '../models/event.entity';
import { IEventEntity } from '../models/event.entity.interface';

export interface IEventRepository {
	create: (params: IEventEntity) => Promise<IEventEntity>;
	findByLocation(location: string): Promise<IEventEntity | null>;
}
