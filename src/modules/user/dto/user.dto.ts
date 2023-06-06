import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
	@IsString({ message: 'name must be a string' })
	@Length(3, 20, { message: 'name must be between 3 and 10 characters' })
	@ApiProperty({ example: 'name' })
	name: string;

	@IsEmail({}, { message: 'not correct email' })
	@Length(5, 50, { message: 'email must be between 5 and 50 characters' })
	@ApiProperty({ example: 'name@gmail.com' })
	email: string;

	@IsString({ message: 'not correct password' })
	@Length(8, 20, { message: 'password must be between 6 and 20 characters' })
	@ApiProperty({ example: 'testtest1' })
	password: string;
}
