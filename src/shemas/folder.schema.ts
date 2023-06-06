import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { File } from './file.schema';

export type FolderDocument = HydratedDocument<Folder>;

@Schema()
export class Folder {
	@Prop()
	name: string;
	@Prop()
	size: string;
	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }] })
	files: File[];
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
