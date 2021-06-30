import { Controller } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {
  }


  @MessagePattern('startWorker')
  startWorker(@Ctx() context: RmqContext) {
    this.workerService.startWorker();
  }

  countWorkers() {
    return this.workerService.countWorkers();
  }
}
