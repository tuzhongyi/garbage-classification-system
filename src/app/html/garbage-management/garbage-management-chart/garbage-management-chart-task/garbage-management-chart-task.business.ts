import { Injectable } from '@angular/core';
import { EventType } from '../../../../common/enum/event-type.enum';
import { TimeUnit } from '../../../../common/enum/time-unit.enum';
import { DivisionNumberStatisticV2 } from '../../../../common/network/model/garbage-station/division-number-statistic-v2.model';
import { GetDivisionStatisticNumbersParamsV2 } from '../../../../common/network/request/division/division-request.params';
import { DivisionRequestService } from '../../../../common/network/request/division/division-request.service';
import { GlobalStorageService } from '../../../../common/storage/global.storage';
import { DateTimeTool } from '../../../../common/tools/date-time-tool/datetime.tool';
import { GarbageManagementChartTaskData } from './garbage-management-chart-task.model';

@Injectable()
export class GarbageManagementChartTaskBusiness {
  constructor(
    private service: DivisionRequestService,
    private global: GlobalStorageService
  ) {}

  async load(date: Date) {
    let division = await this.global.division.selected;
    let datas = await this.datas(division.Id, date);
    let models = this.convert(datas);
    return models;
  }

  private async datas(divisionId: string, date: Date) {
    let duration = DateTimeTool.allDay(date);
    let params = new GetDivisionStatisticNumbersParamsV2();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.TimeUnit = TimeUnit.Hour;
    params.DivisionIds = [divisionId];
    return this.service.statistic.number.history.list(params);
  }

  convert(datas: DivisionNumberStatisticV2[]) {
    let data = new GarbageManagementChartTaskData();

    for (let i = 0; i < datas.length; i++) {
      const item = datas[i];
      if (item.EventNumbers) {
        let drop = item.EventNumbers.find(
          (x) => x.EventType === EventType.GarbageDrop
        );
        if (drop) {
          data.all += drop.DeltaNumber ?? 0;
        }
        let timeout = item.EventNumbers.find(
          (x) => x.EventType === EventType.GarbageDropTimeout
        );
        if (timeout) {
          data.timeout += timeout.DeltaNumber ?? 0;
        }
        let handle = item.EventNumbers.find(
          (x) => x.EventType === EventType.GarbageDropHandle
        );
        if (handle) {
          data.handled += handle.DeltaNumber ?? 0;
        }
      }
    }

    data.unhandled = data.all - data.handled;
    if (data.all > 0) {
      data.ratio.handle = Math.round((data.handled / data.all) * 100);
      data.ratio.timein = Math.round((1 - data.timeout / data.all) * 100);
    }
    return data;
  }
}
