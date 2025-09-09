import { GarbageManagementRankingRecordEventIasDivisionBusiness } from './division/garbage-management-ranking-record-event-ias-division.business';
import { GarbageManagementRankingRecordEventIasDivisionService } from './division/garbage-management-ranking-record-event-ias-division.service';
import { GarbageManagementRankingRecordEventIasBusiness } from './garbage-management-ranking-record-event-ias.business';
import { GarbageManagementRankingRecordEventIasGridBusiness } from './grid/garbage-management-ranking-record-event-ias-grid.business';
import { GarbageManagementRankingRecordEventIasGridService } from './grid/garbage-management-ranking-record-event-ias-grid.service';

export const GarbageManagementRankingRecordEventIasProviders = [
  GarbageManagementRankingRecordEventIasDivisionService,
  GarbageManagementRankingRecordEventIasGridService,
  GarbageManagementRankingRecordEventIasDivisionBusiness,
  GarbageManagementRankingRecordEventIasGridBusiness,
  GarbageManagementRankingRecordEventIasBusiness,
];
