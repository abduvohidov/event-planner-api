import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { json } from 'body-parser';
import { IConfigService } from './config/config.service.interface';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { IEventRepository } from './modules/events/repositories/events.repository.interface';
import { EventController } from './modules/events/controllers/event.controller';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number | string;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaClient) private prismaClient: PrismaClient,
		@inject(TYPES.EventController) private eventController: EventController,
		@inject(TYPES.EventRepository) private eventRepository: IEventRepository,
	) {
		this.app = express();
		this.port = this.configService.get('PORT') || 9000;
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use('/events', this.eventController.router);
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
