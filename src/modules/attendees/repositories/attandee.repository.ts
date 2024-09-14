import { inject, injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';
import { TYPES } from '../../../types';
import { IAttandeeRepository } from './attandee.repository.interface';
import { IAttandeeEntity } from '../models/attandee.entity.interface';

@injectable()
export class AttandeeRepository implements IAttandeeRepository {
	constructor(@inject(TYPES.PrismaClient) private attandeeModel: PrismaClient) {}
	/**
	 * @param attandeeData
	 * @returns */

	async create(params: IAttandeeEntity): Promise<IAttandeeEntity> {
		return await this.attandeeModel.attendee.create({
			data: {
				id: params.id,
				name: params.name,
				email: params.email,
			},
		});
	}

	async find(): Promise<IAttandeeEntity[]> {
		return await this.attandeeModel.attendee.findMany();
	}

	async findById(id: number): Promise<IAttandeeEntity | null> {
		return await this.attandeeModel.attendee.findFirst({
			where: {
				id,
			},
		});
	}

	async findByEmail(email: string): Promise<IAttandeeEntity | null> {
		return await this.attandeeModel.attendee.findFirst({
			where: {
				email,
			},
		});
	}

	async update(id: number, params: IAttandeeEntity): Promise<IAttandeeEntity | null> {
		return await this.attandeeModel.attendee.update({
			where: { id },
			data: {
				name: params.name,
				email: params.email,
			},
		});
	}

	async remove(id: number): Promise<IAttandeeEntity | null> {
		return await this.attandeeModel.attendee.delete({
			where: { id },
		});
	}
}
