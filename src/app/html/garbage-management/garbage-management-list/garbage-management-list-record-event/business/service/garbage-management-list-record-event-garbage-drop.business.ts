import { EventType } from '../../../../../../common/enum/event-type.enum';
import { Duration } from '../../../../../../common/network/model/garbage-station/duration.model';
import { GarbageDropEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { EventRequestService } from '../../../../../../common/network/request/garbage/event/event-request.service';
import { GetGarbageDropEventRecordsParams } from '../../../../../../common/network/request/garbage/event/garbage-drop/event-request-garbage-drop.params';
import { ColorTool } from '../../../../../../common/tools/color-tool/color.tool';
import { Language } from '../../../../../../common/tools/language';
import { GarbageManagementListRecordEventItem } from '../garbage-management-list-record-event.model';

export class GarbageManagementListRecordEventGarbageDropBusiness {
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

  private convert(data: GarbageDropEventRecord) {
    let item: GarbageManagementListRecordEventItem = {
      id: data.EventId,
      name: data.Data.StationName,
      type: Language.EventType(EventType.GarbageDrop),
      time: data.Data.DropTime,
      color: ColorTool.station.state.garbagedrop,
    };
    return item;
  }

  private data = {
    load: (divisionId: string, duration: Duration) => {
      let params = new GetGarbageDropEventRecordsParams();
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      params.DivisionIds = [divisionId];
      params.IsHandle = false;
      return this.service.record.GarbageDrop.all(params);
    },
  };
}
