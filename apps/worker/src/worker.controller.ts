import { Controller } from '@nestjs/common';
import { WorkerService } from './worker.service';

@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  getHello(): string {
    return this.workerService.getHello();
  }

  startWorker() {
    this.workerService.startWorker();
  }

  countWorkers() {
    return this.workerService.countWorkers();
  }
}
