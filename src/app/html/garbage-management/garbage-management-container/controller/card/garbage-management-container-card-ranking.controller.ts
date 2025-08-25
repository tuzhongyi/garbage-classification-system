import { Injectable } from '@angular/core';
import { GarbageManagementContainerCardRankingRecordController } from './garbage-management-container-card-ranking-record.controller';

@Injectable()
export class GarbageManagementContainerCardRankingController {
  constructor(
    public record: GarbageManagementContainerCardRankingRecordController
  ) {}
}
