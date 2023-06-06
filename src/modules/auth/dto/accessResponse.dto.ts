import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class AccessResponseDto {
	@IsString()
	@ApiProperty({ example: 'dfk2323ko223k' })
	id: Types.ObjectId;

	@IsString()
	@ApiProperty({ example: 'asfjisjf.329u902u1u21309u2u023.ujjd322' })
	refreshToken: string;
}
