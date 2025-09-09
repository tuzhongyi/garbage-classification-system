import { EventType } from '../../../../../../common/enum/event-type.enum';
import { DivisionNumberStatistic } from '../../../../../../common/network/model/garbage-station/division-number-statistic.model';
import { GarbageStationNumberStatistic } from '../../../../../../common/network/model/garbage-station/garbage-station-number-statistic.model';
import { IGarbageManagementRankingConverter } from '../../../component/garbage-management-ranking.model';

export class GarbageManagementRankingRecordEventConverter
  implements
    IGarbageManagementRankingConverter<
      GarbageStationNumberStatistic | DivisionNumberStatistic
    >
{
  convert(
    source: GarbageStationNumberStatistic | DivisionNumberStatistic,
    type: EventType
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
