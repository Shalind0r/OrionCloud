import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../shemas/user.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
	providers: [UserService],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule {}
