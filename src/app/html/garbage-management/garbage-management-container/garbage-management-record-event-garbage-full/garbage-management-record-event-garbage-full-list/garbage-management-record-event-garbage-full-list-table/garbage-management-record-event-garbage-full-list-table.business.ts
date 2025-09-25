import { Injectable } from '@angular/core';
import { GarbageFullEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/garbage-full-event-record.model';
import { PagedList } from '../../../../../../common/network/model/page_list.model';
import { DivisionRequestService } from '../../../../../../common/network/request/garbage/division/division-request.service';
import { EventRequestService } from '../../../../../../common/network/request/garbage/event/event-request.service';
import { GetEventRecordGarbageFullParams } from '../../../../../../common/network/request/garbage/event/garbage-full/event-request-garbage-full.params';
import { GarbageStationRequestService } from '../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { PicturesUrl } from '../../../../../../common/network/url/aiop/medium/pictures/pictures.url';
import { DivisionViewModelConverter } from '../../../../../../common/view-model/division.view-model';
import {
  GarbageFullEventRecordViewModel,
  GarbageManagementRecordEventGarbageFullListTableArgs,
} from './garbage-management-record-event-garbage-full-list-table.model';

@Injectable()
export class GarbageManagementRecordEventGarbageFullListTableBusiness {
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
    args: GarbageManagementRecordEventGarbageFullListTableArgs
  ) {
    let datas = await this.data.load(index, size, args);
    let paged = new PagedList<GarbageFullEventRecordViewModel>();
    paged.Page = datas.Page;
    paged.Data = [];
    for (let i = 0; i < datas.Data.length; i++) {
      let item = await this.convert.record(datas.Data[i]);
      paged.Data.push(item);
    }
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
    record: async (data: GarbageFullEventRecord) => {
      let vm = new GarbageFullEventRecordViewModel();
      vm = Object.assign(vm, data);
      vm.GarbageStation = this.service.station.cache.get(data.Data.StationId);
      if (vm.Data.DivisionId) {
        vm.Division = this.service.division.cache
          .get(vm.Data.DivisionId)
          .then((division) => {
            return this.converter.division.convert(division);
          });
      }

      if (data.Data.CameraImageUrls) {
        vm.images = data.Data.CameraImageUrls.map((url) =>
          PicturesUrl.jpg(url.ImageUrl)
        );
      }
      if (data.Data.HandleImageUrls) {
        vm.images = vm.images.concat(
          data.Data.HandleImageUrls.map((url) => PicturesUrl.jpg(url.ImageUrl))
        );
      }
      return vm;
    },
  };

  private data = {
    load: (
      index: number,
      size: number,
      args: GarbageManagementRecordEventGarbageFullListTableArgs
    ) => {
      let params = new GetEventRecordGarbageFullParams();
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
      return this.service.event.record.GarbageFull.list(params);
    },
  };
}
