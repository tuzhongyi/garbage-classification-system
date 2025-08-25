import { DivisionRequestService } from '../../../../../../common/network/request/division/division-request.service';

export class GarbageManagementStatisticRecordService {
  constructor(private service: DivisionRequestService) {}

  load(divisionId: string) {
    return this.service.statistic.number.get(divisionId);
  }
}
