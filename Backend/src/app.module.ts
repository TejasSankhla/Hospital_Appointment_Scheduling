import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorsModule } from './doctors/doctors.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ReceptionistsModule } from './receptionists/receptionists.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/hsv'),
    DoctorsModule,
    ReceptionistsModule,
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
