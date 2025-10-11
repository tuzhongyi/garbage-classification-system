import { Injectable } from '@angular/core';
import { EventType } from '../../../../../../common/enum/event-type.enum';
import { IllegalDropEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { PagedList } from '../../../../../../common/network/model/page_list.model';
import { DivisionRequestService } from '../../../../../../common/network/request/garbage/division/division-request.service';
import { EventRequestService } from '../../../../../../common/network/request/garbage/event/event-request.service';
import { GetEventRecordIllegalDropParams } from '../../../../../../common/network/request/garbage/event/illegal-drop/event-request-illegal-drop.params';
import { GarbageStationRequestService } from '../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { PicturesUrl } from '../../../../../../common/network/url/aiop/medium/pictures/pictures.url';
import { DivisionViewModelConverter } from '../../../../../../common/view-model/division.view-model';
import {
  GarbageManagementRecordEventIllegalDumpListTableArgs,
  IllegalDumpEventRecordViewModel,
} from './garbage-management-record-event-illegal-dump-list-table.model';

@Injectable()
export class GarbageManagementRecordEventIllegalDumpListTableBusiness {
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
    args: GarbageManagementRecordEventIllegalDumpListTableArgs
  ) {
    let datas = await this.data.load(index, size, args);
    let paged = new PagedList<IllegalDumpEventRecordViewModel>();
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
    record: async (data: IllegalDropEventRecord) => {
      let vm = new IllegalDumpEventRecordViewModel();
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

      return vm;
    },
  };

  private data = {
    load: (
      index: number,
      size: number,
      args: GarbageManagementRecordEventIllegalDumpListTableArgs
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
      params.EventTypes = [EventType.IllegalDrop2];
      return this.service.event.record.IllegalDrop.list(params);
    },
  };
}
