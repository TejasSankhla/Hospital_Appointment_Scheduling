import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
// import * as mongoose from 'mongoose';
export type DoctorDocument = HydratedDocument<Doctor>;
@Schema()
export class Doctor {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop(
    raw({
      monday: {
        from: { type: Date },
        to: { type: Date },
        slug: { type: Date },
      },
      tuesday: {
        from: { type: Date },
        to: { type: Date },
        slug: { type: Date },
      },
      wednesday: {
        from: { type: Date },
        to: { type: Date },
        slug: { type: Date },
      },
      thursday: {
        from: { type: Date },
        to: { type: Date },
        slug: { type: Date },
      },
      friday: {
        from: { type: Date },
        to: { type: Date },
        slug: { type: Date },
      },
      saturday: {
        from: { type: Date },
        to: { type: Date },
        slug: { type: Date },
      },
    }),
  )
  availability: Record<string, any>;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
