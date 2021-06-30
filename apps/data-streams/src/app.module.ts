import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { Artwork, ArtworkSchema } from './artwork.schema';

dotenv.config();


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/artwork'),
    MongooseModule.forFeature([{ name: Artwork.name, schema: ArtworkSchema }]),

    ClientsModule.register([
      {
        name: 'worker',
        transport: Transport.RMQ,
        options: { noAck: false, queue: process.env.WORKER_QUEUE, urls: [process.env.RMQ_URL] },
      },
    ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
