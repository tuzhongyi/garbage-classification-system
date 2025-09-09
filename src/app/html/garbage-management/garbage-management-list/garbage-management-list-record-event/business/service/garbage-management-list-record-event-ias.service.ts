import { Injectable } from '@angular/core';
import { Duration } from '../../../../../../common/network/model/garbage-station/duration.model';
import { IasEventRecord } from '../../../../../../common/network/model/ias/ias-event-record.model';
import { GetIasEventsParams } from '../../../../../../common/network/request/ias/event/ias-event-request.params';
import { IasRequestService } from '../../../../../../common/network/request/ias/ias-request.service';
import { ColorTool } from '../../../../../../common/tools/color-tool/color.tool';
import { GarbageManagementListRecordEventItem } from '../garbage-management-list-record-event.model';

@Injectable()
export class GarbageManagementListRecordEventIasBusiness {
  constructor(private service: IasRequestService) {}

  async load(divisionId: string, duration: Duration) {
    try {
      let datas = await this.data.load(divisionId, duration);
      let items = datas.map((x) => {
        return this.convert(x);
      });
      return items;
    } catch (error) {
      return [];
    }
  }

  private convert(data: IasEventRecord) {
    let item: GarbageManagementListRecordEventItem = {
      id: data.Id,
      name: data.DivisionName ?? '未知区域',
      type: data.EmergencyDescription ?? '突发事件',
      time: data.EventTime,
      color: ColorTool.station.state.garbageexposed,
    };
    return item;
  }
  private data = {
    load: (divisionId: string, duration: Duration) => {
      let params = new GetIasEventsParams();
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      params.DivisionIds = [divisionId];
      return this.service.event.all(params);
    },
  };
}
