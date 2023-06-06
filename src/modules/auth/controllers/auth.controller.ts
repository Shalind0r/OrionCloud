import { Body, Controller, Get, Post, Headers, UseGuards } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiHeader,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { UserDto } from '../../user/dto/user.dto';
import { LoginUserDto } from '../dto/loginUser.dto';
import { ResponseUserDto } from '../dto/responseUser.dto';
import { JwtAccessGuard } from '../../../guards/jwtAuthGuard/jwtAccessGuard';
import { JwtRefreshGuard } from '../../../guards/jwtRefreshGuard/jwtRefreshGuard';
import { AccessResponseDto } from '../dto/accessResponse.dto';
import { RefreshResponseDto } from '../dto/refreshResponse.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@ApiOperation({ summary: 'register new user' })
	@ApiResponse({ status: 201, type: ResponseUserDto })
	@Post('register')
	@ApiBody({ type: UserDto })
	create(@Body() dto: UserDto): Promise<ResponseUserDto> {
		return this.authService.registerUser({ ...dto });
	}
	@ApiOperation({ summary: 'login user' })
	@ApiResponse({ status: 200, type: ResponseUserDto })
	@Post('login')
	@ApiBody({ type: LoginUserDto })
	login(@Body() dto: LoginUserDto): Promise<ResponseUserDto> {
		return this.authService.loginUser({ ...dto });
	}

	@ApiHeader({
		name: 'Authorization',
		description: 'Bearer access token',
		required: true,
		example: 'Bearer 32dsfdsf.342ffdsaff323.43223dsaf',
	})
	@ApiResponse({ status: 200, type: AccessResponseDto })
	@UseGuards(JwtAccessGuard)
	@Get('access')
	access(@Headers('authorization') authorizationHeader): Promise<AccessResponseDto> {
		return this.authService.validate(authorizationHeader);
	}

	@ApiHeader({
		name: 'Authorization',
		description: 'Bearer access token',
		required: true,
		example: 'Bearer 32dsfdsf.342ffdsaff323.43223dsaf',
	})
	@ApiResponse({ status: 200, type: RefreshResponseDto })
	@UseGuards(JwtRefreshGuard)
	@Get('refresh')
	refresh(@Headers('authorization') authorizationHeader): Promise<RefreshResponseDto> {
		return this.authService.refresh(authorizationHeader);
	}
}
