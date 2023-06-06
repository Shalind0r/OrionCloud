import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../../shemas/user.schema';
import { Model } from 'mongoose';
import { UserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
	) {}

	private async hashPassword(password: string) {
		return bcrypt.hash(password, 10);
	}

	async findUser(options: { email?: string; id?: string }): Promise<User> {
		const { email, id } = options;

		return this.userModel.findOne(email ? { email } : id && { _id: id });
	}
	async createUser(dto: UserDto): Promise<User> {
		dto.password = await this.hashPassword(dto.password);

		const user = await this.userModel.create(dto);

		return user;
	}
}
