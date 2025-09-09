import { DivisionNumberStatistic } from '../../../../../../common/network/model/garbage-station/division-number-statistic.model';
import { GarbageStationNumberStatistic } from '../../../../../../common/network/model/garbage-station/garbage-station-number-statistic.model';
import {
  IGarbageManagementRankingConverter,
  IGarbageManagementRankingData,
} from '../../../component/garbage-management-ranking.model';

export class GarbageManagementRankingGarbageDropCountConverter
  implements
    IGarbageManagementRankingConverter<
      DivisionNumberStatistic | GarbageStationNumberStatistic
    >
{
  convert(source: DivisionNumberStatistic): IGarbageManagementRankingData {
    let name = source.Name;
    let value = source.GarbageDropStationNumber ?? 0;
    return { name, value, language: `${value}`, unit: '个' };
  }
}
