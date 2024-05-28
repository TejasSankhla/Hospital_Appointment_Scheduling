import { IsNotEmpty } from 'class-validator';

export class CreateDoctorDto {
  readonly name: string;
  readonly phone: number;
  readonly email: string;
  readonly password: string;
  @IsNotEmpty()
  readonly availability: {
    monday: {
      from: Date;
      to: Date;
      slug: Date;
    };
    tuesday: {
      from: Date;
      to: Date;
      slug: Date;
    };
    wednesday: {
      from: Date;
      to: Date;
      slug: Date;
    };
    thursday: {
      from: Date;
      to: Date;
      slug: Date;
    };
    friday: {
      from: Date;
      to: Date;
      slug: Date;
    };
    saturday: {
      from: Date;
      to: Date;
      slug: Date;
    };
  };
}
