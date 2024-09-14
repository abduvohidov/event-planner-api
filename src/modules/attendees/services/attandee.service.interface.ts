import { AttandeeCreateDto } from '../dto/attendee-create.dto';
import { AttandeeUpdateDto } from '../dto/attendee-update.dto';
import { IAttandeeEntity } from '../models/attandee.entity.interface';

export interface IAttandeeService {
	createAttandee: (params: AttandeeCreateDto) => Promise<IAttandeeEntity | null>;
	find: () => Promise<IAttandeeEntity[]>;
	findById: (id: number) => Promise<IAttandeeEntity | null>;
	findByEmail: (email: string) => Promise<IAttandeeEntity | null>;
	update: (id: number, params: AttandeeUpdateDto) => Promise<IAttandeeEntity | null>;
	remove: (id: number) => Promise<IAttandeeEntity | null>;
}
