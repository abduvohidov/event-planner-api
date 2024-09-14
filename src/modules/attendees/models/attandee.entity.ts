import { IAttandeeEntity } from './attandee.entity.interface';

export class AttandeeEntity implements IAttandeeEntity {
	constructor(
		private readonly _id: number,
		private readonly _name: string,
		private readonly _email: string,
	) {}

	get id(): number {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get email(): string {
		return this._email;
	}
}
