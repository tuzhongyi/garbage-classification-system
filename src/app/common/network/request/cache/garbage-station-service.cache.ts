import { GarbageStation } from '../../model/garbage-station/garbage-station.model';
import { PagedList } from '../../model/page_list.model';
import { GetGarbageStationsParams } from '../garbage/garbage-station/garbage-station-request.params';
import { IService } from './cache.interface';
import { ServiceCache } from './service.cache';

export class GarbageStationServiceCache extends ServiceCache<GarbageStation> {
  constructor(key: string, service: IService<GarbageStation>) {
    super(key, service, GarbageStation);
  }

  override async paged(
    params?: GetGarbageStationsParams
  ): Promise<PagedList<GarbageStation>> {
    if (params) {
      if (
        params.Ids ||
        params.Name ||
        params.StationType ||
        params.DivisionId ||
        params.StationTypes
      ) {
        return super.paged(params);
      }
    }
    return this.service.paged(params);
  }

  override filter(
    datas: GarbageStation[],
    args: GetGarbageStationsParams
  ): GarbageStation[] {
    if (args.Ids) {
      datas = datas.filter((x) => args.Ids?.includes(x.Id));
    }
    if (args.Name) {
      datas = datas.filter((x) => x.Name.includes(args.Name!));
    }
    if (args.StationType) {
      datas = datas.filter((x) => x.StationType === args.StationType);
    }
    if (args.DivisionId) {
      datas = datas.filter((x) => x.DivisionId === args.DivisionId);
    }
    if (args.StationTypes && args.StationTypes.length > 0) {
      datas = datas.filter((x) => args.StationTypes?.includes(x.StationType));
    }
    return datas;
  }
}
