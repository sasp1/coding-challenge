import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Transport } from '@nestjs/microservices';
dotenv.config();


const initMicroservice = async (app: INestApplication) => {
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL],
      queue: process.env.DATA_STREAMS_QUEUE,
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  });
  await app.startAllMicroservicesAsync();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initMicroservice(app);
  await app.listen(3000);
}
bootstrap();
