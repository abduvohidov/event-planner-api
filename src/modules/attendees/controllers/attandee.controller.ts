import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../../../common/base.controller';
import { HTTPError } from '../../../errors/http-error.class';
import { ILogger } from '../../../logger/logger.interface';
import { TYPES } from '../../../types';
import { IAttandeeService } from '../services/attandee.service.interface';
import { IAttandeeController } from './attandee.controller.interface';
import { AttandeeCreateDto } from '../dto/attendee-create.dto';
import { IAttandeeEntity } from '../models/attandee.entity.interface';
import { AttandeeUpdateDto } from '../dto/attendee-update.dto';
import 'reflect-metadata';

@injectable()
export class AttandeeController extends BaseController implements IAttandeeController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.AttandeeService) private attandeeService: IAttandeeService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/create',
				method: 'post',
				func: this.create,
			},
			{
				path: '/all',
				method: 'get',
				func: this.findAll,
			},
			{
				path: '/id/:id',
				method: 'get',
				func: this.findById,
			},
			{
				path: '/email/:email',
				method: 'get',
				func: this.findByEmail,
			},
			{
				path: '/update/:id',
				method: 'patch',
				func: this.update,
			},
			{
				path: '/remove/:id',
				method: 'delete',
				func: this.remove,
			},
		]);
	}

	async create(
		{ body }: Request<{}, {}, AttandeeCreateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const data = await this.attandeeService.createAttandee(body);
		if (!data) {
			return next(new HTTPError(422, 'Такой attandee уже существует'));
		}
		this.ok(res, {
			status: true,
			message: 'Attandee успешно создано',
			data,
		});
	}

	async findAll(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<IAttandeeEntity[] | void> {
		const data = await this.attandeeService.find();
		if (!data) {
			return next(new HTTPError(422, 'Такой attandee уже существует'));
		}
		this.ok(res, {
			status: true,
			message: 'Attandee успешно получено',
			data,
		});
	}

	async findById(req: Request, res: Response, next: NextFunction): Promise<IAttandeeEntity | void> {
		const { id } = req.params;
		const data = await this.attandeeService.findById(Number(id));
		if (!data) {
			return next(new HTTPError(422, 'Такой attandee уже существует'));
		}
		this.ok(res, {
			status: true,
			message: 'Attandee успешно получено',
			data,
		});
	}

	async findByEmail(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<IAttandeeEntity | void> {
		const email = req.body;
		const data = await this.attandeeService.findByEmail(email);
		if (!data) {
			return next(new HTTPError(422, 'Такой attandee уже существует'));
		}
		this.ok(res, {
			status: true,
			message: 'Attandee успешно получено',
			data,
		});
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<IAttandeeEntity | void> {
		const { id } = req.params;
		const params: AttandeeUpdateDto = req.body;
		const data = await this.attandeeService.update(Number(id), params);
		if (!data) {
			return next(new HTTPError(422, 'Такой attandee уже существует'));
		}

		this.ok(res, { status: true, message: 'Attandee успешно изменено', data });
	}

	async remove(req: Request, res: Response, next: NextFunction): Promise<IAttandeeEntity | void> {
		const { id } = req.params;
		const result = await this.attandeeService.remove(Number(id));
		if (!result) {
			return next(new HTTPError(422, 'Нет такой attandee'));
		}
		this.ok(res, {
			status: true,
			message: 'Attandee успешно удалено',
		});
	}
}
