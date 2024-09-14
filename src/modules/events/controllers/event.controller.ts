import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../../../common/base.controller';
import { HTTPError } from '../../../errors/http-error.class';
import { ILogger } from '../../../logger/logger.interface';
import { TYPES } from '../../../types';
import { IEventService } from '../services/events.service.interface';
import { EventCreateDto } from '../dto/event-create.dto';
import { IEventController } from './event.controller.interface';
import 'reflect-metadata';
import { IEventEntity } from '../models/event.entity.interface';
import { EventUpdateDto } from '../dto/event-update.dto';

@injectable()
export class EventController extends BaseController implements IEventController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.EventService) private eventService: IEventService,
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
				path: '/id/:address',
				method: 'get',
				func: this.findById,
			},
			{
				path: '/location/:address',
				method: 'get',
				func: this.findByLocation,
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
		{ body }: Request<{}, {}, EventCreateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const data = await this.eventService.createEvent(body);
		if (!data) {
			return next(new HTTPError(422, 'Такой мероприятия уже существует'));
		}
		this.ok(res, {
			status: true,
			message: 'Мероприятия успешно создано',
			data,
		});
	}

	async findAll(req: Request, res: Response, next: NextFunction): Promise<IEventEntity[] | void> {
		const data = await this.eventService.find();
		if (!data) {
			return next(new HTTPError(422, 'Такой мероприятия уже существует'));
		}
		this.ok(res, {
			status: true,
			message: 'Мероприятия успешно получено',
			data,
		});
	}

	async findById(req: Request, res: Response, next: NextFunction): Promise<IEventEntity | void> {
		const { id } = req.params;
		const data = await this.eventService.findById(Number(id));
		if (!data) {
			return next(new HTTPError(422, 'Такой мероприятия уже существует'));
		}
		this.ok(res, {
			status: true,
			message: 'Мероприятия успешно получено',
			data,
		});
	}

	async findByLocation(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<IEventEntity | void> {
		const { location } = req.params;
		const data = await this.eventService.findByLocation(location);
		if (!data) {
			return next(new HTTPError(422, 'Такой мероприятия уже существует'));
		}
		this.ok(res, {
			status: true,
			message: 'Мероприятия успешно получено',
			data,
		});
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<IEventEntity | void> {
		const { id } = req.params;
		const params: EventUpdateDto = req.body;
		const data = await this.eventService.update(Number(id), params);
		if (!data) {
			return next(new HTTPError(422, 'Такой мероприятия уже существует'));
		}

		this.ok(res, { status: true, message: 'Мероприятия успешно изменено', data });
	}

	async remove(req: Request, res: Response, next: NextFunction): Promise<IEventEntity | void> {
		const { id } = req.params;
		const result = await this.eventService.remove(Number(id));
		if (!result) {
			return next(new HTTPError(422, 'Нет такого мероприятия'));
		}
		this.ok(res, {
			status: true,
			message: 'Мероприятия успешно удалено',
		});
	}
}
