import { Injectable } from '@angular/core';
import { PagedList } from '../../../../../../common/network/model/page_list.model';
import { EventRequestService } from '../../../../../../common/network/request/garbage/event/event-request.service';
import { GetEventRecordMixedIntoParams } from '../../../../../../common/network/request/garbage/event/mixed-info/event-request-mixed-info.params';
import { GarbageStationRequestService } from '../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { PicturesUrl } from '../../../../../../common/network/url/aiop/medium/pictures/pictures.url';
import {
  MixedIntoEventRecordViewModel,
  MixedIntoEventRecordViewModelConverter,
} from '../../../../../../common/view-model/record/mixed-into-event-record.view-model';
import { GarbageManagementRecordEventMixedIntoListTableArgs } from './garbage-management-record-event-mixed-into-list-table.model';

@Injectable()
export class GarbageManagementRecordEventMixedIntoListTableBusiness {
  constructor(
    event: EventRequestService,
    station: GarbageStationRequestService,
    private converter: MixedIntoEventRecordViewModelConverter
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
    args: GarbageManagementRecordEventMixedIntoListTableArgs
  ) {
    let datas = await this.data.load(index, size, args);
    let paged = new PagedList<MixedIntoEventRecordViewModel>();
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
      args: GarbageManagementRecordEventMixedIntoListTableArgs
    ) => {
      let params = new GetEventRecordMixedIntoParams();
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
      if (args.handle != undefined) {
        params.IsHandle = args.handle;
      }
      return this.service.event.record.MixedInto.list(params);
    },
  };
}
