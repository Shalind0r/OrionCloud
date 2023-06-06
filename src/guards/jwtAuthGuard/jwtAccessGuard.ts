import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppError } from '../../common/constans/errors';

@Injectable()
export class JwtAccessGuard extends AuthGuard('JwtAccessStrategy') {
	handleRequest(err, id) {
		if (err || !id) {
			throw new UnauthorizedException(AppError.INVALID_TOKEN);
		}
		return id;
	}
}
