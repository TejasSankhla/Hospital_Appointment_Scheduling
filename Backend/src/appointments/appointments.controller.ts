import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './dto/create-appointment.dto';
import { Appointment } from './appointments.schema';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async scheduleAppointment(
    @Res() res,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ) {
    try {
      createAppointmentDto.Appointment_date = new Date(
        createAppointmentDto.Appointment_date,
      );
      // console.log(createAppointmentDto);

      const appointment =
        await this.appointmentsService.scheduleAppointment(
          createAppointmentDto,
        );
      return res.status(201).json({ appointment, success: true, err: {} });
    } catch (error) {
      return res.status(501).json({
        err: error,
      });
    }
  }

  @Get()
  async findAll(
    @Body('doctor') docId: string,
    @Res() res,
  ): Promise<Appointment[]> {
    try {
      return await this.appointmentsService.findAllAppointmentByDoc(docId);
    } catch (error) {
      return res.status(501).json({
        err: error,
      });
    }
  }
  @UseGuards(AuthGuard)
  @Post('day')
  async findAppointmentByDay(
    @Body() updateAppointmentDto: UpdateAppointmentDto,
    @Res() res,
  ): Promise<any> {
    try {
      // console.log('onsode');

      const resp =
        await this.appointmentsService.findAllAppointmentByDate(
          updateAppointmentDto,
        );
      return res.status(201).json(resp);
    } catch (error) {
      return res.status(501).json({
        err: error,
      });
    }
  }
  @Get('doc')
  async findAppointmentByDoc(
    @Res() res,
    @Body('docId') docId: string,
  ): Promise<Appointment[]> {
    try {
      return await this.appointmentsService.findAllAppointmentByDoc(docId);
    } catch (error) {
      return res.status(501).json({
        err: error,
      });
    }
  }
}
