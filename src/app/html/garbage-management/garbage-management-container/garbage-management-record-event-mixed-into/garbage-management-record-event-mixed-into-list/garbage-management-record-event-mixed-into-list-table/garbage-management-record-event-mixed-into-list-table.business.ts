import { Injectable } from '@angular/core';
import { MixedIntoEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/mixed-into-event-record.model';
import { PagedList } from '../../../../../../common/network/model/page_list.model';
import { DivisionRequestService } from '../../../../../../common/network/request/garbage/division/division-request.service';
import { EventRequestService } from '../../../../../../common/network/request/garbage/event/event-request.service';
import { GetEventRecordMixedIntoParams } from '../../../../../../common/network/request/garbage/event/mixed-info/event-request-mixed-info.params';
import { GarbageStationRequestService } from '../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { PicturesUrl } from '../../../../../../common/network/url/aiop/medium/pictures/pictures.url';
import { DivisionViewModelConverter } from '../../../../../../common/view-model/division.view-model';
import {
  GarbageManagementRecordEventMixedIntoListTableArgs,
  MixedIntoEventRecordViewModel,
} from './garbage-management-record-event-mixed-into-list-table.model';

@Injectable()
export class GarbageManagementRecordEventMixedIntoListTableBusiness {
  constructor(
    event: EventRequestService,
    station: GarbageStationRequestService,
    division: DivisionRequestService,
    converter: DivisionViewModelConverter
  ) {
    this.service = { event, station, division };
    this.converter = { division: converter };
  }

  converter: {
    division: DivisionViewModelConverter;
  };

  private service: {
    event: EventRequestService;
    station: GarbageStationRequestService;
    division: DivisionRequestService;
  };

  async load(
    index: number,
    size: number,
    args: GarbageManagementRecordEventMixedIntoListTableArgs
  ) {
    let datas = await this.data.load(index, size, args);
    let paged = new PagedList<MixedIntoEventRecordViewModel>();
    paged.Page = datas.Page;
    paged.Data = datas.Data.map((x) => this.convert.record(x));
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

  private convert = {
    record: (data: MixedIntoEventRecord) => {
      let vm = new MixedIntoEventRecordViewModel();
      vm = Object.assign(vm, data);
      vm.GarbageStation = this.service.station.cache.get(data.Data.StationId);
      if (vm.Data.DivisionId) {
        vm.Division = this.service.division.cache
          .get(vm.Data.DivisionId)
          .then((division) => {
            return this.converter.division.convert(division);
          });
      }

      vm.images = data.ImageUrl ? [data.ImageUrl] : [];

      if (data.Data.HandleImageUrl) {
        vm.images.push(data.Data.HandleImageUrl);
      }

      return vm;
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
      return this.service.event.record.MixedInto.list(params);
    },
  };
}
