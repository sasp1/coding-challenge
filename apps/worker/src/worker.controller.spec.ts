import { Test, TestingModule } from '@nestjs/testing';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { ScheduleModule } from '@nestjs/schedule';
import { BadRequestException } from '@nestjs/common';

describe('WorkerController', () => {
  let workerController: WorkerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ScheduleModule.forRoot()],
      controllers: [WorkerController],
      providers: [WorkerService],
    }).compile();

    workerController = app.get<WorkerController>(WorkerController);
  });

  describe('root', () => {
    it('Should add worker', () => {
      workerController.startWorker();

      expect(workerController.countWorkers()).toBe(1);
    });

    it('Should return error if worker already added', () => {
      workerController.startWorker();
      expect(() => workerController.startWorker()).toThrow(BadRequestException);
    });
  });
});
