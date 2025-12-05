import { DivisionNumberStatistic } from '../../model/garbage-station/division-number-statistic.model';
import { GetDivisionStatisticNumbersParams } from '../garbage/division/division-request.params';
import { IService } from './cache.interface';
import { ServiceCache } from './service.cache';

export class DivisionStatisticServiceCache extends ServiceCache<DivisionNumberStatistic> {
  constructor(key: string, service: IService<DivisionNumberStatistic>) {
    super(key, service, DivisionNumberStatistic, 1 * 20 * 1000, false);
  }

  override filter(
    datas: DivisionNumberStatistic[],
    args: GetDivisionStatisticNumbersParams
  ): DivisionNumberStatistic[] {
    if (args.Ids) {
      datas = datas.filter((x) => args.Ids?.includes(x.Id));
    }
    if (args.Name) {
      datas = datas.filter((x) => x.Name.includes(args.Name!));
    }
    return datas;
  }
}
