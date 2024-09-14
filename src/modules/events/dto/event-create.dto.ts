import { IsString, IsDateString } from 'class-validator';

export class EventCreateDto {
	@IsString()
	id: number;

	@IsString()
	name: string;

	@IsDateString()
	dateStart: string;

	@IsDateString()
	dateEnd: string;

	@IsString()
	location: string;
}
