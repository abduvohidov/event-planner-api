import { IsString, IsEmail } from 'class-validator';

export class AttandeeCreateDto {
	@IsString()
	id: number;

	@IsString()
	name: string;

	@IsEmail()
	email: string;
}
