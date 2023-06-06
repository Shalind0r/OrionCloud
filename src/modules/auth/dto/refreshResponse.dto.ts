import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class RefreshResponseDto {
	@IsString()
	@ApiProperty({ example: 'dfk2323ko223k' })
	id: Types.ObjectId;
}
