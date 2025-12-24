import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { EventNumberStatistic } from '../../../../../../common/network/model/garbage-station/event-number-statistic.model';
import { GetIasEventNumbersParams } from '../../../../../../common/network/request/ias/event/ias-event-request.params';
import { IasRequestService } from '../../../../../../common/network/request/ias/ias-request.service';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { GarbageManagementListRecordEventIasArgs } from '../../../../garbage-management-list/garbage-management-list-record-event-ias/garbage-management-list-record-event-ias.model';
import { IGarbageManagementChartSource } from '../../../garbage-management-chart-line/garbage-management-chart-line.model';

export class GarbageManagementChartRecordEventIasDayBusiness {
  constructor(private service: IasRequestService) {}

  async load(
    unit: TimeUnit,
    date: Date,
    args: GarbageManagementListRecordEventIasArgs
  ) {
    let datas = await this.data(unit, date, args);
    let models = this.convert(datas);
    return models;
  }

  private convert(datas: EventNumberStatistic[]) {
    let items: IGarbageManagementChartSource[] = [];

    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      let time = data.BeginTime;
      let item: IGarbageManagementChartSource = {
        time: time,
        value: 0,
      };
      let number = data.EventNumbers.find((x) => x.EventType === 103);
      if (number) {
        item.value = number.DayNumber;
      }
      items.push(item);
    }

    return items;
  }

  private async data(
    unit: TimeUnit,
    date: Date,
    args: GarbageManagementListRecordEventIasArgs
  ) {
    let duration = DateTimeTool.TimeUnit(unit, date);
    let params = new GetIasEventNumbersParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.IasEventTypes = [103];

    if (args.deviceId) {
      params.DeviceId = args.deviceId;
    }
    if (args.gridcellId) {
      params.GridCellId = args.gridcellId;
    }

    return this.service.event.numbers(params);
  }
}
