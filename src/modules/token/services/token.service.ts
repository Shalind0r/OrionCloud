import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async generateAccessToken(id) {
		const payload = { id };
		const accessToken = this.jwtService.sign(payload, {
			secret: this.configService.get('accessKey'),
			expiresIn: this.configService.get('expireAccessKey'),
		});
		return {
			accessToken,
		};
	}

	async generateRefreshToken(id) {
		const payload = { id };
		const refreshToken = this.jwtService.sign(payload, {
			secret: this.configService.get('refreshKey'),
			expiresIn: this.configService.get('expireRefreshKey'),
		});
		return { refreshToken };
	}
	async extractToken(token) {
		return token.replace('Bearer ', '');
	}
	async decodeToken(token) {
		return this.jwtService.decode(token);
	}
}
