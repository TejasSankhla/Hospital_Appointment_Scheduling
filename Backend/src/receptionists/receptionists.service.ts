import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Receptionist, ReceptionistDocument } from './receptionists.schema';
import { CreateReceptionistDto } from './dto/create-receptionist.dto';
import { UpdateReceptionistDto } from './dto/update-receptionist.dto';

@Injectable()
export class ReceptionistsService {
  constructor(
    @InjectModel(Receptionist.name)
    private receptionistModel: Model<ReceptionistDocument>,
    private jwtService: JwtService,
  ) {}

  async create(
    createReceptionistDto: CreateReceptionistDto,
  ): Promise<Receptionist> {
    try {
      // console.log(createReceptionistDto);

      const hashedPassword = await bcrypt.hash(
        createReceptionistDto.password,
        10,
      );
      // console.log(hashedPassword);

      const createdRec = new this.receptionistModel({
        ...createReceptionistDto,
        password: hashedPassword,
      });
      // console.log(createdRec);

      await createdRec.save();
      //  console.log("saved");

      return createdRec;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const receptionist = await this.receptionistModel
        .findOne({ email })
        .exec();
      if(!receptionist){
        throw { code: 404, message: 'User Not Found' };

      }

      if (!(await bcrypt.compare(password, receptionist.password))) {
        throw { code: 401, message: 'Invalid credentials' };
      }
      const payload = { email: receptionist.email };
      const token = this.jwtService.sign(payload);
      return {
        access_token: token,
        receptionist,
      };
    } catch (error) {
      // console.log('here');

      throw error;
    }
  }

  async findAll(): Promise<Receptionist[]> {
    try {
      return await this.receptionistModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve receptionists',
      );
    }
  }

  async findOne(id: string): Promise<Receptionist> {
    try {
      const receptionist = await this.receptionistModel.findById(id).exec();
      if (!receptionist) {
        throw new NotFoundException('Receptionist not found');
      }
      return receptionist;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve receptionist');
    }
  }

  async update(
    id: string,
    updateReceptionistDto: UpdateReceptionistDto,
  ): Promise<Receptionist> {
    try {
      const updatedReceptionist = await this.receptionistModel
        .findByIdAndUpdate(id, updateReceptionistDto, { new: true })
        .exec();
      if (!updatedReceptionist) {
        throw new NotFoundException('Receptionist not found');
      }
      return updatedReceptionist;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update receptionist');
    }
  }

  async remove(id: string): Promise<Receptionist> {
    try {
      const deletedReceptionist = await this.receptionistModel
        .findByIdAndDelete(id)
        .exec();
      if (!deletedReceptionist) {
        throw new NotFoundException('Receptionist not found');
      }
      return deletedReceptionist;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete receptionist');
    }
  }
}
