import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('worker') private readonly clientProxy: ClientProxy) {
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
}
