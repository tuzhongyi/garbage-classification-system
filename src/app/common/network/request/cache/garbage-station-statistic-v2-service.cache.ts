import { GarbageStationNumberStatisticV2 } from '../../model/garbage-station/garbage-station-number-statistic-v2.model';
import { PagedList } from '../../model/page_list.model';
import { GetGarbageStationStatisticNumbersParams } from '../garbage/garbage-station/garbage-station-request.params';
import { IService } from './cache.interface';
import { ServiceCache } from './service.cache';

export class GarbageStationStatisticV2ServiceCache extends ServiceCache<GarbageStationNumberStatisticV2> {
  constructor(key: string, service: IService<GarbageStationNumberStatisticV2>) {
    super(key, service, GarbageStationNumberStatisticV2, 1 * 20 * 1000, false);
  }

  loadItem(id: string) {
    return this.cache.get(this.key + id) as GarbageStationNumberStatisticV2;
  }
  saveItem(id: string, data: GarbageStationNumberStatisticV2) {
    this.cache.set(this.key + id, data, this.timeout);
  }

  override async get(id: string): Promise<GarbageStationNumberStatisticV2> {
    try {
      let data = this.loadItem(id);
      if (data) {
        return data;
      }
    } catch (error) {}
    return super.get(id);
  }

  override async list(
    args?: GetGarbageStationStatisticNumbersParams
  ): Promise<PagedList<GarbageStationNumberStatisticV2>> {
    try {
      if (args) {
        if (args.Ids) {
          let result: GarbageStationNumberStatisticV2[] = [];
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
