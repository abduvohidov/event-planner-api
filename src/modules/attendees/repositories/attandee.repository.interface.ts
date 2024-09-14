import { IAttandeeEntity } from '../models/attandee.entity.interface';

export interface IAttandeeRepository {
	create: (params: IAttandeeEntity) => Promise<IAttandeeEntity>;
	find: () => Promise<IAttandeeEntity[]>;
	findById: (id: number) => Promise<IAttandeeEntity | null>;
	findByEmail: (email: string) => Promise<IAttandeeEntity | null>;
	update: (id: number, params: IAttandeeEntity) => Promise<IAttandeeEntity | null>;
	remove: (id: number) => Promise<IAttandeeEntity | null>;
}
