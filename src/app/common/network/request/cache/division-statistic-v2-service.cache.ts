import { DivisionNumberStatisticV2 } from '../../model/garbage-station/division-number-statistic-v2.model';
import { PagedList } from '../../model/page_list.model';
import { GetDivisionStatisticNumbersParams } from '../garbage/division/division-request.params';
import { IService } from './cache.interface';
import { ServiceCache } from './service.cache';

export class DivisionStatisticV2ServiceCache extends ServiceCache<DivisionNumberStatisticV2> {
  constructor(key: string, service: IService<DivisionNumberStatisticV2>) {
    super(key, service, DivisionNumberStatisticV2, 1 * 20 * 1000, false);
  }

  loadItem(id: string) {
    return this.cache.get(this.key + id) as DivisionNumberStatisticV2;
  }
  saveItem(id: string, data: DivisionNumberStatisticV2) {
    this.cache.set(this.key + id, data, this.timeout);
  }

  override async get(id: string): Promise<DivisionNumberStatisticV2> {
    try {
      let data = this.loadItem(id);
      if (data) {
        return data;
      }
    } catch (error) {
      console.warn(error);
    }
    return super.get(id);
  }

  override async list(
    args?: GetDivisionStatisticNumbersParams
  ): Promise<PagedList<DivisionNumberStatisticV2>> {
    try {
      if (args) {
        if (args.Ids) {
          let result: DivisionNumberStatisticV2[] = [];
          for (let i = 0; i < args.Ids.length; i++) {
            const id = args.Ids[i];
            let data = this.loadItem(id);
            if (!data) {
              throw new Error();
            }
            result.push(data);
          }
          return super.getPaged(result, args);
        }
      }
    } catch (error) {}

    return this.service.list!(args).then((result) => {
      result.Data.forEach((item) => {
        this.saveItem(item.Id, item);
      });
      return result;
    });
  }
}
