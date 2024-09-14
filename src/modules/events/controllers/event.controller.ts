import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../../../common/base.controller';
import { HTTPError } from '../../../errors/http-error.class';
import { ILogger } from '../../../logger/logger.interface';
import { TYPES } from '../../../types';
import 'reflect-metadata';
import { IEventService } from '../services/events.service.interface';
import { EventCreateDto } from '../dto/event-create.dto';
import { IEventController } from './event.controller.interface';

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
		]);
	}

	async create(
		{ body }: Request<{}, {}, EventCreateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.eventService.createEvent(body);
		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь уже существует'));
		}
		this.ok(res, {
			status: true,
			message: 'Успешно прошли регистрацию',
			data: {
				result,
			},
		});
	}
}
