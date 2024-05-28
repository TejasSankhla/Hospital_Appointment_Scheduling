// src/receptionists/schemas/receptionist.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type ReceptionistDocument = HydratedDocument<Receptionist>;

@Schema()
export class Receptionist {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: number;

  @Prop({ required: true })
  password: string;
}

export const ReceptionistSchema = SchemaFactory.createForClass(Receptionist);
