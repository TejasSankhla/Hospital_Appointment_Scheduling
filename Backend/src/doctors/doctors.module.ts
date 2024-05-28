import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { Doctor, DoctorSchema } from './doctor.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }]),
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret', // Ideally, you should use ConfigService to inject the secret
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [DoctorsService],
  controllers: [DoctorsController],
  exports: [DoctorsService],
})
export class DoctorsModule {}

// nest generate module appointments
