import { EventType } from '../../../../../../common/enum/event-type.enum';
import { DivisionNumberStatistic } from '../../../../../../common/network/model/garbage-station/division-number-statistic.model';
import { Language } from '../../../../../../common/tools/language';
import { GarbageManagementStatisticRecordItem } from '../../garbage-management-statistic-record-item/garbage-management-statistic-record-item.model';

export class GarbageManagementStatisticRecordConverter {
  convert(source: DivisionNumberStatistic, type: EventType) {
    let data = new GarbageManagementStatisticRecordItem();
    data.type = type;
    switch (type) {
      case EventType.GarbageDrop:
        data.name = '垃圾滞留';
        break;
      default:
        data.name = Language.EventType(data.type);
        break;
    }

    if (source.TodayEventNumbers) {
      let event = source.TodayEventNumbers.find((x) => x.EventType === type);
      if (event) {
        data.value = event.DayNumber;
      }
    }

    return data;
  }
}
