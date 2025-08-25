import { GarbageManagementContainerCardCalendarController } from './controller/card/garbage-management-container-card-calendar.controller';
import { GarbageManagementContainerCardRankingRecordController } from './controller/card/garbage-management-container-card-ranking-record.controller';

import { GarbageManagementContainerCardRankingController } from './controller/card/garbage-management-container-card-ranking.controller';
import { GarbageManagementContainerCardController } from './controller/card/garbage-management-container-card.controller';
import { GarbageManagementContainerController } from './controller/garbage-management-container.controller';

const controllers = [
  GarbageManagementContainerController,
  GarbageManagementContainerCardController,
  GarbageManagementContainerCardCalendarController,
  GarbageManagementContainerCardRankingController,
  GarbageManagementContainerCardRankingRecordController,
];
export const garbageManagementContainerProviders = [...controllers];
