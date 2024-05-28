import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateReceptionistDto {

  readonly name: string;


  readonly email: string;


  readonly phone: number;

  readonly password: string;
}
