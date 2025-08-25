import { DivisionNumberStatistic } from '../../../../../common/network/model/garbage-station/division-number-statistic.model';
import { Division } from '../../../../../common/network/model/garbage-station/division.model';
import {
  GetDivisionsParams,
  GetDivisionStatisticNumbersParams,
} from '../../../../../common/network/request/division/division-request.params';
import { DivisionRequestService } from '../../../../../common/network/request/division/division-request.service';
import { LocaleCompare } from '../../../../../common/tools/locale-compare';
import { IGarbageManagementRankingConverter } from '../../component/garbage-management-ranking.model';

export class GarbageManagementRankingGarbageDropDivisionBusiness {
  constructor(private service: DivisionRequestService) {}

  async load(
    date: Date,
    divisionId: string,
    converter: IGarbageManagementRankingConverter<DivisionNumberStatistic>
  ) {
    let children = await this.children(divisionId);
    let datas = await this.data(children, date);
    let models = datas
      .map((data) => converter.convert(data))
      .sort((a, b) => LocaleCompare.compare(a.value, b.value, false));
    return models;
  }

  private children(divisionId: string) {
    let params = new GetDivisionsParams();
    params.ParentId = divisionId;
    return this.service.cache.all(params);
  }

  private async data(divisions: Division[], date: Date) {
    let params = new GetDivisionStatisticNumbersParams();
    params.Ids = divisions.map((x) => x.Id);
    let paged = await this.service.statistic.number.cache.list(params);
    return paged.Data;
  }
}
