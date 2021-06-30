import { BadRequestException, Controller, Delete, Get, NotFoundException, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  artworkData : any

  @Post('workers')
  async startWorker() {
    try {
      await this.appService.startWorker().toPromise();
    } catch (e) {
      if (e.type == 400) {
        throw new BadRequestException('Worker already created');
      }
    }
  }

  @Delete('workers')
  async removeWorker() {
    try {
      await this.appService.removeWorker().toPromise();
    } catch (e) {
      if (e.type == 400) {
        throw new BadRequestException('No workers present');
      }
    }
  }

  @Get("artwork")
  async getArtworkData(){
    if (!this.artworkData) {
      throw new NotFoundException('No artwork data present');
    }

    return this.artworkData;
  }

  @MessagePattern('art-data')
  async receiveArtworkData(@Ctx() context: RmqContext, @Payload() data) {
    const channel = context.getChannelRef();
    const msg = context.getMessage();
    channel.ack(msg);

    this.artworkData = JSON.parse(data);
  }

}
