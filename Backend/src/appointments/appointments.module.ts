// appointments.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { Appointment, AppointmentSchema } from './appointments.schema';
import { DoctorsModule } from '../doctors/doctors.module'; // Assuming you have a Doctors module

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
    DoctorsModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  // exports: [AppointmentsService], 

})
export class AppointmentsModule {}
