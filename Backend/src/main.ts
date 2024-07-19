import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { morgan } from 'morgan';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(morgan('dev'));
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://hospital-appointment-scheduling-tau.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
