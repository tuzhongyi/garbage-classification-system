import { GarbageManagementRankingRecordEventBusiness } from './garbage-management-ranking-record-event.business';
import { GarbageManagementRankingRecordEventService } from './service/garbage-management-ranking-record-event.service';

export const GarbageManagementRankingRecordEventProviders = [
  GarbageManagementRankingRecordEventBusiness,
  GarbageManagementRankingRecordEventService,
];
