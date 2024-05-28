// create-appointment.dto.ts
import {
  IsNotEmpty,
  IsDateString,
  IsString,
  IsNumber,
  IsMongoId,
  IsOptional,
} from 'class-validator';

export class CreateAppointmentDto {

  Appointment_date: Date;

  Appointment_time: Date;

  patient_name: string;


  @IsNumber()
  patient_num: number;

 
  @IsMongoId() // Assuming Doctor ID is of type ObjectId
  doctor: string; // Doctor ID


  @IsMongoId() 
  receptionist: string; // Doctor ID
}

// update-appointment.dto.ts
import { PartialType } from '@nestjs/mapped-types';
// import { CreateAppointmentDto } from './create-appointment.dto';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {}
