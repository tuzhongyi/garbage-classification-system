import { Injectable } from '@angular/core';
import { IasEventRecord } from '../../../../../../../common/network/model/ias/ias-event-record.model';
import { PagedList } from '../../../../../../../common/network/model/page_list.model';
import { GetIasEventsParams } from '../../../../../../../common/network/request/ias/event/ias-event-request.params';
import { IasRequestService } from '../../../../../../../common/network/request/ias/ias-request.service';
import { MediumRequestService } from '../../../../../../../common/network/request/medium/medium-request.service';
import {
  GarbageManagementRecordEventIasListTableArgs,
  GarbageManagementRecordEventIasListTableItem,
} from './garbage-management-record-event-ias-list-table.model';

@Injectable()
export class GarbageManagementRecordEventIasListTableBusiness {
  constructor(
    private service: IasRequestService,
    private medium: MediumRequestService
  ) {}

  async load(
    index: number,
    size: number,
    args: GarbageManagementRecordEventIasListTableArgs
  ) {
    let datas = await this.data.load(index, size, args);
    let paged = new PagedList<GarbageManagementRecordEventIasListTableItem>();
    paged.Page = datas.Page;
    paged.Data = datas.Data.map((x) => this.convert(x));
    return paged;
  }

  picture(id: string) {
    return this.medium.picture.get(id);
  }

  private convert(data: IasEventRecord) {
    let item = new GarbageManagementRecordEventIasListTableItem();
    item = Object.assign(item, data);
    item.Device = this.service.device.get(data.DeviceId);
    return item;
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
      params.Desc = 'EventTime';
      return this.service.event.list(params);
    },
  };
}
