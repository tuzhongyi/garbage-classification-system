import { TimeUnit } from '../../../../../../../common/enum/time-unit.enum';
import { IasEventRecord } from '../../../../../../../common/network/model/ias/ias-event-record.model';
import {
  Page,
  PagedList,
} from '../../../../../../../common/network/model/page_list.model';
import { GetIasEventsParams } from '../../../../../../../common/network/request/ias/event/ias-event-request.params';
import { IasRequestService } from '../../../../../../../common/network/request/ias/ias-request.service';
import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';

export class GarbageManagementChartPieRecordStatisticContainerIasService {
  constructor(private service: IasRequestService) {}
  load(divisionId: string, unit: TimeUnit, timeout?: boolean) {
    let duration = DateTimeTool.TimeUnit(unit, new Date());
    let params = new GetIasEventsParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.EventType = 103;
    params.PageIndex = 1;
    params.PageSize = 1;
    params.IsTimeout = timeout;
    return this.service.event.cache.paged(params).catch((x) => {
      let paged = new PagedList<IasEventRecord>();
      paged.Page = Page.create(1, 0);
      paged.Data = [];
      return paged;
    });
  }
}
