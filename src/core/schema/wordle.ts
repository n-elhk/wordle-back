import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'src/shared/mongoose/object-id';

export type WordleDocument = Wordle & Document;

@Schema()
export class Wordle {
  public _id?: ObjectId;
  @Prop(String) public solution: string;
  @Prop(String) public link: string;
  @Prop(Boolean) public displayed: boolean;
  @Prop(Boolean) public isDisplay: boolean;
  @Prop({ type: Array<number>(), default: [] }) public displayed_at: number[];
}

const WordleSchema = SchemaFactory.createForClass(Wordle);
export { WordleSchema };
