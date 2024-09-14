import { IEventEntity } from './event.entity.interface';

export class EventEntity implements IEventEntity {
	constructor(
		private readonly _id: number,
		private readonly _name: string,
		private readonly _location: string,
		private readonly _dateStart: string,
		private readonly _dateEnd: string,
	) {}

	get id(): number {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get location(): string {
		return this._location;
	}

	get dateStart(): string {
		return this._dateStart;
	}

	get dateEnd(): string {
		return this._dateEnd;
	}
}
