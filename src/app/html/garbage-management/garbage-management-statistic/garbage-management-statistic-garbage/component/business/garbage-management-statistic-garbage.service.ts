import { DivisionRequestService } from '../../../../../../common/network/request/garbage/division/division-request.service';

export class GarbageManagementStatisticGarbageService {
  constructor(private service: DivisionRequestService) {}

  load(divisionId: string) {
    return this.service.statistic.number.get(divisionId);
  }
}
