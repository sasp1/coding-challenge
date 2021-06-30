import { BadRequestException, Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class WorkerService {
  constructor(private schedulerRegistry: SchedulerRegistry) {
  }

  startWorker() {
    const job = new CronJob(`${5} * * * * *`, this.fetchData);

    if (this.schedulerRegistry.getCronJobs().size > 0) {
      throw new RpcException({ type: 400, msg: 'worker job already added' });
    }
    this.schedulerRegistry.addCronJob('worker-job', job);
    job.start();
  }

  countWorkers() {
    return this.schedulerRegistry.getCronJobs().size;
  }

  private fetchData() {

  }
}
