import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Doctor } from '../doctors/doctor.schema';
import { Receptionist } from '../receptionists/receptionists.schema';
export type AppointmentDocument = HydratedDocument<Appointment>;
@Schema()
export class Appointment {
  @Prop({ required: true })
  Appointment_date: Date;

  @Prop()
  Appointment_time: Date;

  @Prop({ required: true })
  patient_name: String;

  @Prop({ required: true })
  patient_num: Number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  })
  doctor: Doctor;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Receptionist',
  })
  receptionist: Receptionist;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
