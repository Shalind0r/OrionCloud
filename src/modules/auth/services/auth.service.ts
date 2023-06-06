import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { UserDto } from '../../user/dto/user.dto';
import { AppError } from '../../../common/constans/errors';
import { LoginUserDto } from '../dto/loginUser.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../../token/services/token.service';
import { ResponseUserDto } from '../dto/responseUser.dto';
import { RefreshResponseDto } from '../dto/refreshResponse.dto';
import { AccessResponseDto } from '../dto/accessResponse.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly tokenService: TokenService,
	) {}

	async registerUser(dto: UserDto): Promise<ResponseUserDto> {
		const user = await this.userService.findUser({ email: dto.email });
		if (user) throw new BadRequestException(AppError.USER_EXIST);

		const createdUser = await this.userService.createUser(dto);
		return await this.tokenService.generateAccessToken(createdUser._id);
	}

	async loginUser(dto: LoginUserDto): Promise<ResponseUserDto> {
		const user = await this.userService.findUser({ email: dto.email });
		if (!user) throw new BadRequestException(AppError.USER_NOT_EXIST);

		const validatePassword = await bcrypt.compare(dto.password, user.password);
		if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);

		return await this.tokenService.generateAccessToken(user._id);
	}

	async validate(token): Promise<AccessResponseDto> {
		const getToken = await this.tokenService.extractToken(token);
		const decodedToken = await this.tokenService.decodeToken(getToken);
		if (typeof decodedToken !== 'object')
			throw new BadRequestException(AppError.INVALID_TOKEN);

		const user = await this.userService.findUser({ id: decodedToken.id });
		if (!user) throw new BadRequestException(AppError.USER_NOT_EXIST);
		const refreshToken = await this.tokenService.generateRefreshToken(user._id);
		return { id: user._id, ...refreshToken };
	}
	async refresh(token): Promise<RefreshResponseDto> {
		const getToken = await this.tokenService.extractToken(token);
		const decodedToken = await this.tokenService.decodeToken(getToken);
		if (typeof decodedToken !== 'object')
			throw new BadRequestException(AppError.INVALID_TOKEN);

		const user = await this.userService.findUser({ id: decodedToken.id });
		if (!user) throw new BadRequestException(AppError.USER_NOT_EXIST);
		return { id: user._id };
	}
}
