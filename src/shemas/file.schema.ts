import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type FileDocument = HydratedDocument<File>;

@Schema()
export class File {
	@Prop()
	name: string;
	@Prop()
	size: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
