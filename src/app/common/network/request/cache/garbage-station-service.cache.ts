import { plainToInstance } from 'class-transformer';
import { GarbageStation } from '../../model/garbage-station/garbage-station.model';
import { PagedList } from '../../model/page_list.model';
import { GetGarbageStationsParams } from '../garbage/garbage-station/garbage-station-request.params';
import { IService } from './cache.interface';
import { ServiceCache } from './service.cache';

export class GarbageStationServiceCache extends ServiceCache<GarbageStation> {
  constructor(key: string, service: IService<GarbageStation>) {
    super(key, service, GarbageStation);
  }
  override async get(id: string): Promise<GarbageStation> {
    return new Promise((reject) => {
      this.wait((data) => {
        let result = data.find((x) => x.Id === id);
        if (result) {
          reject(result);
          return;
        }
        this.service.get(id).then((x) => {
          let datas = this.load();
          if (!datas) datas = [];
          let index = datas.findIndex((x) => x.Id == id);
          if (index < 0) {
            datas.push(x);
            this.save(datas);
          }
          reject(x);
        });
      });
    });
  }

  override async list(
    args?: GetGarbageStationsParams
  ): Promise<PagedList<GarbageStation>> {
    if (args) {
      if (args.DivisionId || args.AncestorId || args.DryFull || args.WetFull) {
        return super.list(args);
      }
    }
    return new Promise((reject) => {
      this.wait(() => {
        let paged: PagedList<GarbageStation>;
        let datas = this.load() as GarbageStation[];
        datas = plainToInstance(GarbageStation, datas);
        if (args) {
          datas = this.filter(datas, args);
          paged = this.getPaged(datas);
        } else {
          paged = this.getPaged(datas);
        }
        reject(paged);
      });
    });
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
    return datas;
  }
}
