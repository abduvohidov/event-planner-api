import { NextFunction, Request, Response } from 'express';
import { IEventEntity } from '../models/event.entity.interface';

export interface IEventController {
	create: (req: Request, res: Response, next: NextFunction) => void;
	findAll: (req: Request, res: Response, next: NextFunction) => Promise<IEventEntity[] | void>;
	findById: (req: Request, res: Response, next: NextFunction) => Promise<IEventEntity | void>;
	findByLocation: (req: Request, res: Response, next: NextFunction) => Promise<IEventEntity | void>;
	update: (req: Request, res: Response, next: NextFunction) => Promise<IEventEntity | void>;
	remove: (req: Request, res: Response, next: NextFunction) => Promise<IEventEntity | void>;
}
