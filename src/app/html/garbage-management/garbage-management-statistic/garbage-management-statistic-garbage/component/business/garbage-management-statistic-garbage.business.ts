import { Injectable } from '@angular/core';
import { DivisionRequestService } from '../../../../../../common/network/request/garbage/division/division-request.service';
import { GlobalStorageService } from '../../../../../../common/storage/global.storage';
import { GarbageManagementStatisticGarbageConverter } from './garbage-management-statistic-garbage.converter';
import { GarbageManagementStatisticGarbageService } from './garbage-management-statistic-garbage.service';

@Injectable()
export class GarbageManagementStatisticGarbageBusiness {
  constructor(
    service: DivisionRequestService,
    private global: GlobalStorageService
  ) {
    this.service = new GarbageManagementStatisticGarbageService(service);
  }

  private service: GarbageManagementStatisticGarbageService;
  private converter = new GarbageManagementStatisticGarbageConverter();

  async load() {
    let division = await this.global.division.selected;
    let data = await this.service.load(division.Id);
    let dry = this.converter.dry(data);
    let wet = this.converter.wet(data);
    let recyclable = this.converter.recyclable(data);
    return [dry, wet, recyclable];
  }
}
