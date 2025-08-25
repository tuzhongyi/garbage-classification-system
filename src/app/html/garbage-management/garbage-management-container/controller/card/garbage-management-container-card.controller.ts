import { Injectable } from '@angular/core';
import { GarbageManagementContainerCardCalendarController } from './garbage-management-container-card-calendar.controller';
import { GarbageManagementContainerCardRankingController } from './garbage-management-container-card-ranking.controller';

@Injectable()
export class GarbageManagementContainerCardController {
  constructor(
    public calendar: GarbageManagementContainerCardCalendarController,
    public ranking: GarbageManagementContainerCardRankingController
  ) {}
}
