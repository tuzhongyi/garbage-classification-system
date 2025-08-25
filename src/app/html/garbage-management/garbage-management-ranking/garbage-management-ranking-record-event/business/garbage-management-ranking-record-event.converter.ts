import { EventType } from '../../../../../common/enum/event-type.enum';
import { DivisionNumberStatistic } from '../../../../../common/network/model/garbage-station/division-number-statistic.model';
import { GarbageStationNumberStatistic } from '../../../../../common/network/model/garbage-station/garbage-station-number-statistic.model';

export class GarbageManagementRankingRecordEventConverter {
  convert(
    type: EventType,
    source: GarbageStationNumberStatistic | DivisionNumberStatistic
  ) {
    let name = source.Name;
    let value = 0;
    if (source.TodayEventNumbers) {
      let event = source.TodayEventNumbers.find((x) => x.EventType === type);
      if (event) {
        value = event.DayNumber;
      }
    }
    return { name, value, language: `${value}`, unit: '起' };
  }
}
