// src/receptionists/receptionists.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Res,
} from '@nestjs/common';
import { ReceptionistsService } from './receptionists.service';
import { CreateReceptionistDto } from './dto/create-receptionist.dto';
import { UpdateReceptionistDto } from './dto/update-receptionist.dto';
import { Receptionist } from './receptionists.schema';

@Controller('receptionists')
export class ReceptionistsController {
  constructor(private readonly receptionistsService: ReceptionistsService) {}

  @Post()
  async create(
    @Body() createReceptionistDto: CreateReceptionistDto,
  ): Promise<Receptionist> {
    console.log(createReceptionistDto);

    return this.receptionistsService.create(createReceptionistDto);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res,
  ): Promise<any> {
    try {
      // console.log(email, password);
      const data = await this.receptionistsService.login(email, password);
      // console.log(data);

      res.status(201).json({
        token : data.access_token,
        data: data,
        success: true,
        err: {},
      });
    } catch (error) {
      console.log(error);

      return res.status(201).json({
        data: {},
        success: false,
        err: error,
      });
    }
  }
  @Get()
  async findAll(): Promise<Receptionist[]> {
    return this.receptionistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Receptionist> {
    return this.receptionistsService.findOne(id);
  }

  // @Post(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateReceptionistDto: UpdateReceptionistDto,
  // ): Promise<Receptionist> {
  //   return this.receptionistsService.update(id, updateReceptionistDto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string): Promise<Receptionist> {
  //   return this.receptionistsService.remove(id);
  // }
}
