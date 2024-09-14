import { inject, injectable } from 'inversify';
import { TYPES } from '../../../types';
import { IConfigService } from '../../../config/config.service.interface';
import { IAttandeeService } from './attandee.service.interface';
import { IAttandeeRepository } from '../repositories/attandee.repository.interface';
import { AttandeeCreateDto } from '../dto/attendee-create.dto';
import { IAttandeeEntity } from '../models/attandee.entity.interface';
import { AttandeeEntity } from '../models/attandee.entity';
import { AttandeeUpdateDto } from '../dto/attendee-update.dto';

@injectable()
export class AttandeesService implements IAttandeeService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.AttandeeRepository) private attandeeRepository: IAttandeeRepository,
	) {}

	async createAttandee(params: AttandeeCreateDto): Promise<IAttandeeEntity | null> {
		const newAttandee = new AttandeeEntity(params.id, params.name, params.email);
		const existedAttandee = await this.attandeeRepository.findByEmail(params.email);
		if (existedAttandee) {
			return null;
		}
		return await this.attandeeRepository.create(newAttandee);
	}

	async find(): Promise<IAttandeeEntity[]> {
		return await this.attandeeRepository.find();
	}

	async findById(id: number): Promise<IAttandeeEntity | null> {
		return await this.attandeeRepository.findById(id);
	}

	async findByEmail(email: string): Promise<IAttandeeEntity | null> {
		return await this.attandeeRepository.findByEmail(email);
	}

	async update(id: number, params: AttandeeUpdateDto): Promise<IAttandeeEntity | null> {
		const existedAttandee = await this.attandeeRepository.findById(id);
		if (!existedAttandee) {
			return null;
		}

		return await this.attandeeRepository.update(id, params);
	}

	async remove(id: number): Promise<IAttandeeEntity | null> {
		const existedAttandee = await this.attandeeRepository.findById(id);
		if (!existedAttandee) {
			return null;
		}
		return await this.attandeeRepository.remove(id);
	}
}
