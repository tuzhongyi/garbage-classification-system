import { Injectable } from '@angular/core';
import { TimeUnit } from '../../../../../common/enum/time-unit.enum';
import { IasEventRecord } from '../../../../../common/network/model/ias/ias-event-record.model';
import { GetIasEventsParams } from '../../../../../common/network/request/ias/event/ias-event-request.params';
import { IasRequestService } from '../../../../../common/network/request/ias/ias-request.service';
import { GlobalStorageService } from '../../../../../common/storage/global.storage';
import { ArrayTool } from '../../../../../common/tools/array-tool/array.tool';
import { DateTimeTool } from '../../../../../common/tools/date-time-tool/datetime.tool';
import { IGarbageManagementChartRecordEventData } from '../garbage-management-chart-record-event.model';

@Injectable()
export class GarbageManagementChartRecordEventIasBusiness {
  constructor(
    private service: IasRequestService,
    private global: GlobalStorageService
  ) {}

  async load(unit: TimeUnit) {
    let division = await this.global.division.selected;
    let datas: IasEventRecord[] = [];

    datas = await this.data(division.Id, unit).catch(() => {
      return [];
    });

    let models = this.convert(datas);
    return models;
  }

  private convert(datas: IasEventRecord[]) {
    let group = ArrayTool.groupBy(datas, (x) => {
      return x.EventTime.getHours();
    });
    let items: IGarbageManagementChartRecordEventData[] = [];
    let now = new Date();
    for (let hour = 0; hour < now.getHours() + 1; hour++) {
      let time = new Date();
      time.setHours(hour, 0, 0, 0);
      let item: IGarbageManagementChartRecordEventData = {
        time: time,
        value: 0,
      };
      if (group[hour]) {
        item.value = group[hour].length;
      }
      items.push(item);
    }
    return items;
  }

  private async data(divisionId: string, unit: TimeUnit) {
    let duration = DateTimeTool.TimeUnit(unit, new Date());
    let params = new GetIasEventsParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.DivisionIds = [divisionId];
    return this.service.event.all(params);
  }
}
