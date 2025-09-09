import { instanceToPlain } from 'class-transformer';
import { ServiceTool } from '../../../../../tools/service-tool/service.tool';
import { IllegalVehicleEventRecord } from '../../../../model/garbage-station/event-record/illegal-vehicle-event-record.model';
import { PagedList } from '../../../../model/page_list.model';
import { EventUrl } from '../../../../url/garbage/event.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../../base-request-howell.service';
import {
  EventProcessParams,
  GetIllegalVehicleEventRecordsParams,
} from './event-request-illegal-vehicle.params';

export class EventRecordIllegalVehicleRequestService {
  constructor(private basic: HowellBaseRequestService) {
    this.type = basic.type(IllegalVehicleEventRecord);
  }

  type: HowellBaseTypeRequestService<IllegalVehicleEventRecord>;

  list(
    params: GetIllegalVehicleEventRecordsParams
  ): Promise<PagedList<IllegalVehicleEventRecord>> {
    let url = EventUrl.record.illegalvehicle.list();
    return this.type.paged(url, params);
  }
  get(id: string): Promise<IllegalVehicleEventRecord> {
    let url = EventUrl.record.illegalvehicle.item(id);
    return this.type.get(url);
  }
  async all(
    params: GetIllegalVehicleEventRecordsParams = new GetIllegalVehicleEventRecordsParams()
  ) {
    return ServiceTool.all((_params) => {
      return this.list(_params);
    }, params);
  }

  process(id: string, params: EventProcessParams) {
    let url = EventUrl.record.illegalvehicle.process(id);
    let plain = instanceToPlain(params);
    return this.type.post(url, plain);
  }
}
