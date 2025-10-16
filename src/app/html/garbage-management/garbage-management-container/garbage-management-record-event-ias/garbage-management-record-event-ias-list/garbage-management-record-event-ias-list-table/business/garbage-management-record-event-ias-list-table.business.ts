import { Injectable } from '@angular/core';
import { GetIasEventsParams } from '../../../../../../../common/network/request/ias/event/ias-event-request.params';
import { IasRequestService } from '../../../../../../../common/network/request/ias/ias-request.service';
import { IasEventRecordViewModelConverter } from '../../../../../../../common/view-model/record/ias-event-record.view-model';
import { GarbageManagementRecordEventIasListTableArgs } from './garbage-management-record-event-ias-list-table.model';

@Injectable()
export class GarbageManagementRecordEventIasListTableBusiness {
  constructor(
    private service: IasRequestService,

    private converter: IasEventRecordViewModelConverter
  ) {}

  async load(
    index: number,
    size: number,
    args: GarbageManagementRecordEventIasListTableArgs
  ) {
    let datas = await this.data.load(index, size, args);
    // let paged = new PagedList<IasEventRecordViewModel>();
    // paged.Page = datas.Page;
    // paged.Data = datas.Data.map((x) => this.converter.convert(x));
    return datas;
  }

  private data = {
    load: (
      index: number,
      size: number,
      args: GarbageManagementRecordEventIasListTableArgs
    ) => {
      let params = new GetIasEventsParams();
      params.PageIndex = index;
      params.PageSize = size;
      params.BeginTime = args.duration.begin;
      params.EndTime = args.duration.end;
      params.EventType = 103;
      params.Asc = 'EventTime';
      return this.service.event.paged(params);
    },
  };
}
