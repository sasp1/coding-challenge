import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Model } from 'mongoose';
import { Artwork, ArtworkDocument } from './artwork.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(@Inject('worker') private readonly clientProxy: ClientProxy,
              @InjectModel(Artwork.name) private artworkModel: Model<ArtworkDocument>) {
  }


  getHello(): string {
    return 'Hello World!';
  }

   startWorker() : Observable<string>{
    return this.clientProxy.send<string>('startWorker', {});
  }

  removeWorker() {
    return this.clientProxy.send<string>('removeWorker', {});
  }

  getArtworkData() {
    return this.artworkModel.findOne();
  }

  async addArtworkData(data) {
    const artworkDTO = JSON.parse(data);

    let artwork = await this.artworkModel.findOne({ id: artworkDTO.id });

    if (!artwork) {
      artwork = new this.artworkModel(artworkDTO);
    } else {
      await artwork.update(artworkDTO);
    }
    await artwork.save();
  }
}
