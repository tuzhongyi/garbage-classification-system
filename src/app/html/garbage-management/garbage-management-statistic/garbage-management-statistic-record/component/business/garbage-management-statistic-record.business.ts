import { Injectable } from '@angular/core';
import { EventType } from '../../../../../../common/enum/event-type.enum';
import { DivisionRequestService } from '../../../../../../common/network/request/division/division-request.service';
import { GlobalStorageService } from '../../../../../../common/storage/global.storage';
import { GarbageManagementStatisticRecordConverter } from './garbage-management-statistic-record.converter';
import { GarbageManagementStatisticRecordService } from './garbage-management-statistic-record.service';

@Injectable()
export class GarbageManagementStatisticRecordBusiness {
  constructor(
    service: DivisionRequestService,
    private global: GlobalStorageService
  ) {
    this.service = new GarbageManagementStatisticRecordService(service);
    this.converter = new GarbageManagementStatisticRecordConverter();
  }

  private service: GarbageManagementStatisticRecordService;
  private converter: GarbageManagementStatisticRecordConverter;

  async load() {
    let division = await this.global.division.selected;
    let data = await this.service.load(division.Id);
    let models = [
      this.converter.convert(data, EventType.IllegalDrop),
      this.converter.convert(data, EventType.GarbageDrop),
      this.converter.convert(data, EventType.GarbageFull),
      this.converter.convert(data, EventType.MixedInto),
    ];
    return models;
  }
}
