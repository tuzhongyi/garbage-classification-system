import { wait } from '../../../tools/wait.tools';
import { IasEventRecord } from '../../model/ias/ias-event-record.model';
import { PagedDurationParams } from '../IParams.interface';
import { GetIasEventsParams } from '../ias/event/ias-event-request.params';
import { IService } from './cache.interface';
import { ServiceCache } from './service.cache';

export class IasEventServiceCache extends ServiceCache<IasEventRecord> {
  constructor(key: string, service: IService<IasEventRecord>) {
    super(key, service, IasEventRecord, 1 * 0.5 * 1000, false);
  }

  override all(params: PagedDurationParams): Promise<IasEventRecord[]> {
    return new Promise<IasEventRecord[]>((resolve) => {
      wait(() => {
        return this.loading === false;
      })
        .then(() => {
          let datas = this.load();
          if (datas && datas.length > 0) {
            resolve(datas);
          } else {
            this.loading = true;
            this.service
              .all(params)
              .then((datas) => {
                this.save([...datas]);
                resolve(datas);
              })
              .finally(() => {
                this.loading = false;
              });
          }
        })
        .catch(() => {
          console.error('ServiceCache all wait error');
        });
    });
  }

  override async array(params: GetIasEventsParams): Promise<IasEventRecord[]> {
    let duration = new PagedDurationParams();
    duration.BeginTime = params.BeginTime;
    duration.EndTime = params.EndTime;
    let all = await this.all(duration);
    let array = await this.filter(all, params);
    return array;
  }

  override clear(): void {
    super.clear();
  }

  override filter(
    datas: IasEventRecord[],
    args: GetIasEventsParams
  ): IasEventRecord[] {
    if (args.DivisionIds && args.DivisionIds.length > 0) {
      datas = datas.filter(
        (x) => x.DivisionId && args.DivisionIds!.includes(x.DivisionId)
      );
    }
    if (args.GridCellIds && args.GridCellIds.length > 0) {
      datas = datas.filter(
        (x) => x.GridCellId && args.GridCellIds!.includes(x.GridCellId)
      );
    }
    if (args.EmergencyType) {
      datas = datas.filter((x) => x.EmergencyType === args.EmergencyType);
    }
    if (args.EventType) {
      datas = datas.filter((x) => x.EventType === args.EventType);
    }
    if (args.IsTimeout != undefined) {
      datas = datas.filter((x) => x.IsTimeout == args.IsTimeout);
    }
    if (args.Ids && args.Ids.length > 0) {
      datas = datas.filter((x) => args.Ids?.includes(x.Id));
    }
    return datas;
  }
}
