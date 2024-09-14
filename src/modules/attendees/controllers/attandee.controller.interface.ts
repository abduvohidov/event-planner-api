import { NextFunction, Request, Response } from 'express';
import { IAttandeeEntity } from '../models/attandee.entity.interface';

export interface IAttandeeController {
	create: (req: Request, res: Response, next: NextFunction) => void;
	findAll: (req: Request, res: Response, next: NextFunction) => Promise<IAttandeeEntity[] | void>;
	findById: (req: Request, res: Response, next: NextFunction) => Promise<IAttandeeEntity | void>;
	findByEmail: (req: Request, res: Response, next: NextFunction) => Promise<IAttandeeEntity | void>;
	update: (req: Request, res: Response, next: NextFunction) => Promise<IAttandeeEntity | void>;
	remove: (req: Request, res: Response, next: NextFunction) => Promise<IAttandeeEntity | void>;
}
