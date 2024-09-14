import { App } from './app';
import { Container, ContainerModule, interfaces } from 'inversify';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';
import { ExeptionFilter } from './errors/exeption.filter';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { IEventRepository } from './modules/events/repositories/events.repository.interface';
import { EventRepository } from './modules/events/repositories/events.repository';
import { PrismaClient } from '@prisma/client';
import { EventController } from './modules/events/controllers/event.controller';
import { IEventController } from './modules/events/controllers/event.controller.interface';
import { IEventService } from './modules/events/services/events.service.interface';
import { EventsService } from './modules/events/services/events.service';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(new PrismaClient());

	bind<IEventRepository>(TYPES.EventRepository).to(EventRepository).inSingletonScope();
	bind<IEventController>(TYPES.EventController).to(EventController).inSingletonScope();
	bind<IEventService>(TYPES.EventService).to(EventsService);

	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
