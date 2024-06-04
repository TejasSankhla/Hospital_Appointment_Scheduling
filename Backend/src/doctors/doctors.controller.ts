// src/doctors/doctors.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Res,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './doctor.schema';
import { AuthGuard } from '../guard/auth.guard';
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    try {
      return await this.doctorsService.create(createDoctorDto);
    } catch (error) {
      throw new BadRequestException('Failed to create doctor');
    }
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res,
  ): Promise<any> {
    try {
      const data = await this.doctorsService.login(email, password);
      // console.log(data);
      const token = data.access_token;
      // @Header('Authorization', `Bearer ${token}`)
      res.status(201).json({
        token: token,
        data: data,
        success: true,
        err: {},
      });
    } catch (error) {
      return res.status(201).json({
        data: {},
        success: false,
        err: error.message,
      });
    }
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Doctor> {
    try {
      const doctor = await this.doctorsService.findOne(id);
      if (!doctor) {
        throw new NotFoundException(`Doctor with ID ${id} not found`);
      }
      return doctor;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve doctor');
    }
  }
  @UseGuards(AuthGuard)
  @Post('name')
  async GetIdByName(@Body('name') name: string, @Res() res): Promise<any> {
    try {
      const doctor = await this.doctorsService.findIdByName(name);
      if (!doctor) {
        throw { message: `Doctor with  ${name} not found` };
      }
      return res.status(201).json({
        docid: doctor,
        success: true,
        err: {},
      });
    } catch (error) {
      return res.status(501).json({
        err: error,
        success: false,
      });
    }
  }

  // @Post(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateDoctorDto: UpdateDoctorDto,
  // ): Promise<Doctor> {
  //   try {
  //   // console.log("here");

  //     const updatedDoctor = await this.doctorsService.update(
  //       id,
  //       updateDoctorDto,
  //     );
  //     if (!updatedDoctor) {
  //       throw new NotFoundException(`Doctor with ID ${id} not found`);
  //     }
  //     return updatedDoctor;
  //   } catch (error) {
  //     if (error instanceof NotFoundException) {
  //       throw error;
  //     }
  //     throw new BadRequestException('Failed to update doctor');
  //   }
  // }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Doctor> {
    try {
      const removedDoctor = await this.doctorsService.remove(id);
      if (!removedDoctor) {
        throw new NotFoundException(`Doctor with ID ${id} not found`);
      }
      return removedDoctor;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete doctor');
    }
  }
  @UseGuards(AuthGuard)
  @Post('get/availability')
  async getDoctorAvailability(
    @Body('doctorId') doctorId: string,
    @Res() res, @Req() req
  ): Promise<any> {
    // Assuming you only need the availability part
    // console.log('insisde get avilability',req );

    try {
      const availability =
        await this.doctorsService.getDoctorAvailability(doctorId);
      if (!availability) {
        throw { message: `Doctor with ID ${doctorId} not found` };
      }
      // console.log('response generated');

      return res.status(201).json(availability);
    } catch (error) {
      return res.status(400).json({
        err: error.code,
        msg: error.message,
      });
    }
  }
  @UseGuards(AuthGuard)
  @Post(':doctorId/availability')
  async updateAvailability(
    @Param('doctorId') doctorId: string,
    @Body() body: any,
    @Res() res,
  ): Promise<any> {
    // console.log(body);

    try {
      const updatedAvailability = await this.doctorsService.updateAvailability(
        doctorId,
        body,
      );
      if (!updatedAvailability) {
        throw { message: `Doctor with ID ${doctorId} not found` };
      }
      // console.log('updated',updatedAvailability);

      return res.status(201).json({
        availability: updatedAvailability,
        success: true,
        err: {},
      });
    } catch (error) {
      console.log(error);

      return res.status(400).json({
        err: error.code,
        msg: error.message,
      });
    }
  }
}
