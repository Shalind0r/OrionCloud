import { UserDto } from '../../user/dto/user.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
	@IsString()
	@ApiProperty({ example: 'idosafjiosdajdfoiasdjfoijwefiojsafdojrwepkpofwpo329' })
	accessToken: string;
}
