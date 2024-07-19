// src/doctors/doctors.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from './doctor.schema';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
    private jwtService: JwtService,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    try {
      const hashedPassword = await bcrypt.hash(createDoctorDto.password, 10);
      const createdDoctor = new this.doctorModel({
        ...createDoctorDto,
        password: hashedPassword,
      });
      return await createdDoctor.save();
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const doctor = await this.doctorModel.findOne({ email }).exec();
      // console.log(doctor, email, password);
      if (!doctor) {
        throw { code: 404, message: 'User Not Found' };
      }
      if (!(await bcrypt.compare(password, doctor.password))) {
        throw { code: 401, message: 'Invalid credentials' };
      }
      const payload = { user: doctor };
      const token = this.jwtService.sign(payload);
      return {
        access_token: token,
        doctor,
      };
    } catch (error) {
      // console.log('here');

      throw error;
    }
  }

  async findOne(id: string): Promise<Doctor> {
    try {
      const doctor = await this.doctorModel.findById(id).exec();
      if (!doctor) {
        throw { message: `Doctor with ${name} not found` };
      }
      return doctor;
    } catch (error) {
      throw error;
    }
  }
  async findIdByName(name: string): Promise<Doctor> {
    try {
      const doctor = await this.doctorModel.findOne({ name }).exec();
      // return doctor;
      if (!doctor) {
        throw { message: `Doctor with ${name} not found` };
      }
      return doctor;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<Doctor> {
    try {
      const removedDoctor = await this.doctorModel.findByIdAndDelete(id).exec();
      if (!removedDoctor) {
        throw { message: `Doctor with ID ${id} not found` };
      }
      return removedDoctor;
    } catch (error) {
      throw error;
    }
  }

  async getDoctorAvailability(doctorId: string): Promise<any> {
    try {
      const doctor = await this.doctorModel.findById(doctorId).exec();
      if (!doctor) {
        throw { message: `Doctor with ID ${doctorId} not found` };
      }
      return doctor.availability;
    } catch (error) {
      throw error;
    }
  }

  async updateAvailability(doctorId: string, body: any): Promise<any> {
    try {
      // console.log(body);

      const doctor = await this.doctorModel.findById(doctorId).exec();
      if (!doctor) {
        throw { message: `Doctor with ID ${doctorId} not found` };
      }

      doctor.availability = body;
      const days = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ];

      days.forEach((day) => {
        if (doctor.availability[day]) {
          doctor.availability[day].from = new Date(
            doctor.availability[day].from,
          );
          doctor.availability[day].to = new Date(doctor.availability[day].to);
          doctor.availability[day].slug = doctor.availability[day].from;
        }
      });
      await doctor.save();
      return doctor;
    } catch (error) {
      throw error;
    }
  }

  async updateSlugForDay(
    doctorId: string,
    day: string,
    upSlug: Date,
  ): Promise<any> {
    try {
      const doctor = await this.doctorModel.findById(doctorId).exec();
      if (!doctor) {
        throw { message: `Doctor with ID ${doctorId} not found` };
      }

      doctor.availability[day].slug = upSlug;

      await doctor.save();
      return doctor;
    } catch (error) {
      throw error;
    }
  }
}
