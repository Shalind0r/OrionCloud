import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppError } from '../../common/constans/errors';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('JwtRefreshStrategy') {
	handleRequest(err, id) {
		if (err || !id) {
			throw new UnauthorizedException(AppError.INVALID_TOKEN);
		}
		return id;
	}
}
