import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { json } from 'body-parser';
import { IConfigService } from './config/config.service.interface';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { PrismaClient } from '@prisma/client';
import 'reflect-metadata';
import { EventController, IEventRepository } from './modules/events';
import { AttandeeController, IAttandeeRepository } from './modules/attendees';
import { IUsersRepository, UserController } from './modules/users';
import { AuthMiddleware } from './common/auth.middleware';
import { PrismaService } from './database/prisma.service';

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
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.UserRepository) private userRepository: IUsersRepository,
		@inject(TYPES.EventController) private eventController: EventController,
		@inject(TYPES.EventRepository) private eventRepository: IEventRepository,
		@inject(TYPES.AttandeeController) private attandeeController: AttandeeController,
		@inject(TYPES.AttandeeRepository) private attandeeRepository: IAttandeeRepository,
	) {
		this.app = express();
		this.port = this.configService.get('PORT') || 9000;
	}

	useMiddleware(): void {
		this.app.use(json());
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	useRoutes(): void {
		this.app.use('/events', this.eventController.router);
		this.app.use('/attandees', this.attandeeController.router);
		this.app.use('/users', this.userController.router);
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
