import { DivisionNumberStatistic } from '../../../../../../common/network/model/garbage-station/division-number-statistic.model';
import { GarbageStationNumberStatistic } from '../../../../../../common/network/model/garbage-station/garbage-station-number-statistic.model';
import { Language } from '../../../../../../common/tools/language';
import {
  IGarbageManagementRankingConverter,
  IGarbageManagementRankingData,
} from '../../../component/garbage-management-ranking.model';

export class GarbageManagementRankingGarbageDropDurationConverter
  implements
    IGarbageManagementRankingConverter<
      DivisionNumberStatistic | GarbageStationNumberStatistic
    >
{
  convert(
    source: DivisionNumberStatistic | GarbageStationNumberStatistic
  ): IGarbageManagementRankingData {
    let name = source.Name;
    let value = source.CurrentGarbageTime ?? 0;
    let language = Language.Time(value, 'minute') ?? '';
    return { name, value, language, unit: '' };
  }
}
