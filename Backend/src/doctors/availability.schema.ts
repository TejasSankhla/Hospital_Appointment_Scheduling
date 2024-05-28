// src/doctors/schemas/availability.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Availability extends Document {
  @Prop()
  date: Date;

  @Prop()
  start_time: string; // You can use string to represent time (e.g., 'HH:mm')

  @Prop()
  end_time: string; // Same as above

  @Prop()
  head: string; // Same as above
}

export const AvailabilitySchema = SchemaFactory.createForClass(Availability);
