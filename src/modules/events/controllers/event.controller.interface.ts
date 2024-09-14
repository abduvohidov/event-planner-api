import { NextFunction, Request, Response } from 'express';

export interface IEventController {
	create: (req: Request, res: Response, next: NextFunction) => void;
}
