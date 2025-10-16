import { IasEventRecord } from '../../../../../../common/network/model/ias/ias-event-record.model';
import { GetIasEventsParams } from '../../../../../../common/network/request/ias/event/ias-event-request.params';
import { IasRequestService } from '../../../../../../common/network/request/ias/ias-request.service';
import { ArrayTool } from '../../../../../../common/tools/array-tool/array.tool';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { IGarbageManagementChartSource } from '../../../garbage-management-chart-line/garbage-management-chart-line.model';

export class GarbageManagementChartRecordEventIasHourBusiness {
  constructor(private service: IasRequestService) {}

  async load(date: Date, deviceId?: string) {
    let datas = await this.data(date, deviceId);
    let models = this.convert(date, datas);
    return models;
  }

  private convert(date: Date, datas: IasEventRecord[]) {
    let group = ArrayTool.groupBy(datas, (x) => {
      return x.EventTime.getHours();
    });
    let items: IGarbageManagementChartSource[] = [];

    let end = 24;
    if (DateTimeTool.is.today(date)) {
      let now = new Date();
      end = now.getHours() + 1;
    }

    for (let hour = 0; hour < end; hour++) {
      let time = new Date();
      time.setHours(hour, 0, 0, 0);
      let item: IGarbageManagementChartSource = {
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

  private data(date: Date, deviceId?: string) {
    let duration = DateTimeTool.all.day(date);
    let params = new GetIasEventsParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.EventType = 103;

    return this.service.event.cache.array(params);
  }
}
