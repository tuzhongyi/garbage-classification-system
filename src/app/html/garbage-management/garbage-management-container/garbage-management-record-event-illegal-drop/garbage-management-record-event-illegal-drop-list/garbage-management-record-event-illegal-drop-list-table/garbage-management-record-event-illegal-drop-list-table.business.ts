import { Injectable } from '@angular/core';
import { EventType } from '../../../../../../common/enum/event-type.enum';
import { PagedList } from '../../../../../../common/network/model/page_list.model';
import { EventRequestService } from '../../../../../../common/network/request/garbage/event/event-request.service';
import { GetEventRecordIllegalDropParams } from '../../../../../../common/network/request/garbage/event/illegal-drop/event-request-illegal-drop.params';
import { GarbageStationRequestService } from '../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { PicturesUrl } from '../../../../../../common/network/url/aiop/medium/pictures/pictures.url';
import { IllegalDropEventRecordViewModelConverter } from '../../../../../../common/view-model/record/illegal-drop-event-record.view-model';
import {
  GarbageManagementRecordEventIllegalDropListTableArgs,
  IllegalDropEventRecordViewModel,
} from './garbage-management-record-event-illegal-drop-list-table.model';

@Injectable()
export class GarbageManagementRecordEventIllegalDropListTableBusiness {
  constructor(
    event: EventRequestService,
    station: GarbageStationRequestService,

    private converter: IllegalDropEventRecordViewModelConverter
  ) {
    this.service = { event, station };
  }

  private service: {
    event: EventRequestService;
    station: GarbageStationRequestService;
  };

  async load(
    index: number,
    size: number,
    args: GarbageManagementRecordEventIllegalDropListTableArgs
  ) {
    let datas = await this.data.load(index, size, args);
    let paged = new PagedList<IllegalDropEventRecordViewModel>();
    paged.Page = datas.Page;
    paged.Data = datas.Data.map((x) => this.converter.convert(x));
    return paged;
  }

  download = {
    video: (stationId: string, cameraId: string, time: Date) => {
      this.service.station.download.video(stationId, cameraId, time);
    },
    image: (key: string, name: string, time: Date) => {
      let url = PicturesUrl.jpg(key);
      this.service.station.download.image(url, name, time);
    },
  };

  private data = {
    load: (
      index: number,
      size: number,
      args: GarbageManagementRecordEventIllegalDropListTableArgs
    ) => {
      let params = new GetEventRecordIllegalDropParams();
      params.PageIndex = index;
      params.PageSize = size;
      params.BeginTime = args.duration.begin;
      params.EndTime = args.duration.end;
      if (args.divisionId) {
        params.DivisionIds = [args.divisionId];
      }
      if (args.stationId) {
        params.StationIds = [args.stationId];
      }
      if (args.stationname) {
        params.StationName = args.stationname;
      }
      if (args.communityname) {
        params.CommunityName = args.communityname;
      }
      params.EventTypes = [EventType.IllegalDrop];
      return this.service.event.record.IllegalDrop.list(params);
    },
  };
}
