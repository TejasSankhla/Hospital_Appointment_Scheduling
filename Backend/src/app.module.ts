import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorsModule } from './doctors/doctors.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ReceptionistsModule } from './receptionists/receptionists.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwtConstants';
@Module({
  imports: [
    // Load environment variables from .env file
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),

    DoctorsModule,
    ReceptionistsModule,
    AppointmentsModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret, // Ideally, you should use ConfigService to inject the secret
      signOptions: { expiresIn: '30m' },
      global: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
