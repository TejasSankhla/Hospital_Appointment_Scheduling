// src/receptionists/receptionists.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReceptionistsService } from './receptionists.service';
import { ReceptionistsController } from './receptionists.controller';
import { Receptionist, ReceptionistSchema } from './receptionists.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Receptionist.name, schema: ReceptionistSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret', // Ideally, you should use ConfigService to inject the secret
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [ReceptionistsController],
  providers: [ReceptionistsService],
  exports: [ReceptionistsService],
})
export class ReceptionistsModule {}
