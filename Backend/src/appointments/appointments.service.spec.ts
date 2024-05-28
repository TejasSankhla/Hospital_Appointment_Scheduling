import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './appointments.schema';
import { getModelToken } from '@nestjs/mongoose';
import { DoctorsService } from '../doctors/doctors.service'
describe('AppointmentsService', () => {
  let service: AppointmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentsService,
        {
          provide: getModelToken(Appointment.name),
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(), 
            destroy: jest.fn(),
          },
        },
        {
          provide: DoctorsService,  // Provide the mocked DoctorsService
          useValue: jest.fn(),       // Mock implementation
        },
      ],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined(); 
  });
});
