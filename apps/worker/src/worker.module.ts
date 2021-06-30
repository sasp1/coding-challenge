import { HttpModule, Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: 'data_streams',
        transport: Transport.RMQ,
        options: { noAck: false, queue: process.env.DATA_STREAMS_QUEUE, urls: [process.env.RMQ_URL] },
      },
    ]),
  ],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
