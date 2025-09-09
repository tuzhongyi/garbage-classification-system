import { Injectable } from '@angular/core';
import { EventType } from '../../../../../../common/enum/event-type.enum';
import { Duration } from '../../../../../../common/network/model/garbage-station/duration.model';
import { MixedIntoEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/mixed-into-event-record.model';
import { EventRequestService } from '../../../../../../common/network/request/garbage/event/event-request.service';
import { GetEventRecordMixedIntoParams } from '../../../../../../common/network/request/garbage/event/mixed-info/event-request-mixed-info.params';
import { ColorTool } from '../../../../../../common/tools/color-tool/color.tool';
import { Language } from '../../../../../../common/tools/language';
import { GarbageManagementListRecordEventItem } from '../garbage-management-list-record-event.model';

@Injectable()
export class GarbageManagementListRecordEventMixedIntoBusiness {
  constructor(private service: EventRequestService) {}

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

  private convert(data: MixedIntoEventRecord) {
    let item: GarbageManagementListRecordEventItem = {
      id: data.EventId,
      name: data.Data.StationName,
      type: Language.EventType(EventType.MixedInto),
      time: data.EventTime,
      color: ColorTool.station.state.mixedinto,
    };
    return item;
  }

  private data = {
    load: (divisionId: string, duration: Duration) => {
      let params = new GetEventRecordMixedIntoParams();
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      params.DivisionIds = [divisionId];
      params.IsHandle = false;
      return this.service.record.MixedInto.all(params);
    },
  };
}
