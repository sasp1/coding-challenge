import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(WorkerModule, {
    // Setup communication protocol here
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL],
      noAck: false,
      queue: process.env.WORKER_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });
  app.listen(async () => {
    console.log('Microservice is listening');
  });
}

bootstrap();
