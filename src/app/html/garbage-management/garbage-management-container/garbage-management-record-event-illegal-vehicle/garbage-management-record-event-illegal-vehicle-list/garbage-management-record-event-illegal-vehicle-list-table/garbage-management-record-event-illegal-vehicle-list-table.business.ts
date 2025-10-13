import { Injectable } from '@angular/core';
import { IllegalVehicleEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/illegal-vehicle-event-record.model';
import { PagedList } from '../../../../../../common/network/model/page_list.model';
import { DivisionRequestService } from '../../../../../../common/network/request/garbage/division/division-request.service';
import { EventRequestService } from '../../../../../../common/network/request/garbage/event/event-request.service';
import { GetIllegalVehicleEventRecordsParams } from '../../../../../../common/network/request/garbage/event/illegal-vehicle/event-request-illegal-vehicle.params';
import { GarbageStationRequestService } from '../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { PicturesUrl } from '../../../../../../common/network/url/aiop/medium/pictures/pictures.url';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';
import { DivisionViewModelConverter } from '../../../../../../common/view-model/division.view-model';
import { GarbageManagementRecordEventGarbageDropListTableArgs } from '../../../garbage-management-record-event-garbage-drop/garbage-management-record-event-garbage-drop-list/garbage-management-record-event-garbage-drop-list-table/garbage-management-record-event-garbage-drop-list-table.model';
import {
  GarbageManagementRecordEventIllegalVehicleListTableArgs,
  IllegalVehicleEventRecordViewModel,
} from './garbage-management-record-event-illegal-vehicle-list-table.model';

@Injectable()
export class GarbageManagementRecordEventIllegalVehicleListTableBusiness {
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
    args: GarbageManagementRecordEventIllegalVehicleListTableArgs
  ) {
    let datas = await this.data.load(index, size, args);
    let paged = new PagedList<IllegalVehicleEventRecordViewModel>();
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
    record: (data: IllegalVehicleEventRecord) => {
      let vm = new IllegalVehicleEventRecordViewModel();
      vm = Object.assign(vm, data);
      vm.GarbageStation = this.service.station.cache.get(data.Data.StationId);
      if (vm.Data.DivisionId) {
        vm.Division = this.service.division.cache
          .get(vm.Data.DivisionId)
          .then((division) => {
            return this.converter.division.convert(division);
          });
      }

      vm.images = ObjectTool.model.record.illegalvehicle.images(data);

      return vm;
    },
  };

  private data = {
    load: (
      index: number,
      size: number,
      args: GarbageManagementRecordEventGarbageDropListTableArgs
    ) => {
      let params = new GetIllegalVehicleEventRecordsParams();
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
      return this.service.event.record.IllegalVehicle.list(params);
    },
  };
}
