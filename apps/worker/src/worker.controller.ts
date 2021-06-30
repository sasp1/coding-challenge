import { Controller } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {
  }


  @MessagePattern('startWorker')
  startWorker(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const msg = context.getMessage();
    channel.ack(msg);
    this.workerService.startWorker();
  }

  @MessagePattern('removeWorker')
  removeWorker(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const msg = context.getMessage();
    channel.ack(msg);
    this.workerService.removeWorker();
  }

  countWorkers() {
    return this.workerService.countWorkers();
  }
}
