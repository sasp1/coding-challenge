import { BadRequestException, Controller, Delete, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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

  @Get()
  getHello(): string {
    return this.appService.getHello();

  }
}
