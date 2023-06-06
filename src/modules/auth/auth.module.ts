import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';

import { JwtAccessStrategy } from '../../guards/jwtAuthGuard/jwtAccessStrategy';
import { JwtRefreshStrategy } from '../../guards/jwtRefreshGuard/jwtRefreshStrategy';

@Module({
	imports: [UserModule, TokenModule],
	controllers: [AuthController],
	providers: [AuthService, JwtAccessStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
