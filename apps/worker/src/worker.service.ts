import { BadRequestException, HttpService, Inject, Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import * as _ from 'lodash';


@Injectable()
export class WorkerService {
  constructor(private schedulerRegistry: SchedulerRegistry,
              private readonly httpService: HttpService,
              @Inject('data_streams') private readonly clientProxy: ClientProxy) {
  }

  startWorker() {
    const job = new CronJob(`*/5 * * * * *`, () => this.fetchAndSendData());

    if (this.schedulerRegistry.getCronJobs().size > 0) {
      throw new RpcException({ type: 400, msg: 'worker job already added' });
    }
    this.schedulerRegistry.addCronJob('worker-job', job);
    job.start();
  }

  countWorkers() {
    return this.schedulerRegistry.getCronJobs().size;
  }

  async fetchAndSendData() {
    const url = 'https://api.artic.edu/api/v1/artworks/129884';
    const data = await this.httpService.get(url).toPromise();
    const artWorkRaw = data.data.data;
    const artWork = _.pick(artWorkRaw, ['id', "title", "artist_title", "place_of_origin", "timestamp"]);
    this.clientProxy.emit('art-data', JSON.stringify(artWork));
  }

  removeWorker() {
    if (this.schedulerRegistry.getCronJobs().size == 0) {
      throw new RpcException({ type: 400, msg: 'No worker present' });
    }
    this.schedulerRegistry.deleteCronJob('worker-job');
  }
}
