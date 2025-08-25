import { GarbageStationNumberStatistic } from '../../../../../common/network/model/garbage-station/garbage-station-number-statistic.model';
import { GetGarbageStationStatisticNumbersParams } from '../../../../../common/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from '../../../../../common/network/request/garbage-station/garbage-station-request.service';
import { LocaleCompare } from '../../../../../common/tools/locale-compare';
import { IGarbageManagementRankingConverter } from '../../component/garbage-management-ranking.model';

export class GarbageManagementRankingGarbageDropStationBusiness {
  constructor(private service: GarbageStationRequestService) {}

  async load(
    date: Date,
    divisionId: string,
    converter: IGarbageManagementRankingConverter<GarbageStationNumberStatistic>
  ) {
    let datas = await this.data(divisionId, date);
    let models = datas
      .map((data) => converter.convert(data))
      .sort((a, b) => LocaleCompare.compare(a.value, b.value, false));
    return models;
  }

  private async data(divisionId: string, date: Date) {
    let params = new GetGarbageStationStatisticNumbersParams();
    params.DivisionId = divisionId;
    let paged = await this.service.statistic.number.cache.list(params);
    return paged.Data;
  }
}
