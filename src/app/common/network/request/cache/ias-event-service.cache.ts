import { IasEventRecord } from '../../model/ias/ias-event-record.model';
import { GetIasEventsParams } from '../ias/event/ias-event-request.params';
import { IService } from './cache.interface';
import { ServiceCache } from './service.cache';

export class IasEventServiceCache extends ServiceCache<IasEventRecord> {
  constructor(key: string, service: IService<IasEventRecord>) {
    super(key, service, IasEventRecord, 1 * 0.5 * 1000, false);
  }

  override filter(
    datas: IasEventRecord[],
    args: GetIasEventsParams
  ): IasEventRecord[] {
    if (args.DivisionIds) {
      datas = datas.filter(
        (x) => x.DivisionId && args.DivisionIds!.includes(x.DivisionId)
      );
    }
    if (args.EmergencyType) {
      datas = datas.filter((x) => x.EmergencyType === args.EmergencyType);
    }
    if (args.EventType) {
      datas = datas.filter((x) => x.EventType === args.EventType);
    }
    if (args.Ids) {
      datas = datas.filter((x) => args.Ids?.includes(x.Id));
    }
    return datas;
  }
}
