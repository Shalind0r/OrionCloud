import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Folder } from './folder.schema';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
	@Prop({ default: () => new Types.ObjectId(), type: Types.ObjectId })
	_id: Types.ObjectId;
	@Prop()
	name: string;
	@Prop()
	email: string;
	@Prop()
	password: string;
	@Prop({ default: null })
	photo: string;
	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Folder' }] })
	folders: Folder[];
}

export const UserSchema = SchemaFactory.createForClass(User);
