import { IsString, IsEmail } from 'class-validator';

export class AttandeeUpdateDto {
	@IsString()
	id: number;

	@IsString()
	name: string;

	@IsEmail()
	email: string;
}
