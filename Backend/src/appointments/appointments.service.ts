import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model } from 'mongoose';
import { Appointment, AppointmentDocument } from './appointments.schema';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './dto/create-appointment.dto';
import { getDayFromDate } from './utils/get-day';
import { DoctorsService } from '../doctors/doctors.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
    private readonly doctorService: DoctorsService,
  ) {}

  async scheduleAppointment(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    try {
      const day = getDayFromDate(createAppointmentDto.Appointment_date);

      const availability = await this.doctorService.getDoctorAvailability(
        createAppointmentDto.doctor,
      );
      if (!availability || !availability[day]) {
        throw {
          code: 409,
          message: `Doctor is not available for ${day}`,
        };
      }

      const { from, to, slug } = availability[day];
      let updatedSlug = new Date(slug);
      updatedSlug.setMinutes(updatedSlug.getMinutes() + 30);

      if (to.getTime() < updatedSlug.getTime()) {
        throw {
          code: 409,
          message: "Appointment outside doctor's availability",
        };
      }

      await this.doctorService.updateSlugForDay(
        createAppointmentDto.doctor,
        day,
        updatedSlug,
      );

      createAppointmentDto.Appointment_time = slug;
      const appointment = this.appointmentModel.create(createAppointmentDto);
      // await appointment.save();
      return appointment;
    } catch (error) {
      throw error;
    }
  }

  async findAllAppointmentByDoc(docId: string): Promise<Appointment[]> {
    try {
      const appointments = await this.appointmentModel
        .find({ doctor: docId })
        .exec();
      if (!appointments || appointments.length === 0) {
        throw { message: 'No appointments found for the specifieed doctor' };
      }
      return appointments;
    } catch (error) {
      throw error;
    }
  }
  async findAllAppointmentByDate(
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<any> {
    try {
      const startOfDay = new Date(updateAppointmentDto.Appointment_date);
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(updateAppointmentDto.Appointment_date);
      endOfDay.setUTCHours(23, 59, 59, 999);

      const appointments = await this.appointmentModel
        .find({
          Appointment_date: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        })
        .exec();
      return { app: appointments };
    } catch (error) {
      throw error;
    }
  }
}
