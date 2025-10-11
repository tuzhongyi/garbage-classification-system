import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { EventType } from '../../../../../../common/enum/event-type.enum';
import { GarbageDropEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { PagedList } from '../../../../../../common/network/model/page_list.model';
import { DivisionRequestService } from '../../../../../../common/network/request/garbage/division/division-request.service';
import { EventRequestService } from '../../../../../../common/network/request/garbage/event/event-request.service';
import { GetGarbageDropEventRecordsParams } from '../../../../../../common/network/request/garbage/event/garbage-drop/event-request-garbage-drop.params';
import { GarbageStationRequestService } from '../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { PicturesUrl } from '../../../../../../common/network/url/aiop/medium/pictures/pictures.url';
import { Language } from '../../../../../../common/tools/language';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';
import { DivisionViewModelConverter } from '../../../../../../common/view-model/division.view-model';
import {
  GarbageDropEventRecordViewModel,
  GarbageManagementRecordEventGarbageDropListTableArgs,
} from './garbage-management-record-event-garbage-drop-list-table.model';

@Injectable()
export class GarbageManagementRecordEventGarbageDropListTableBusiness {
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
    args: GarbageManagementRecordEventGarbageDropListTableArgs
  ) {
    let datas = await this.data.load(index, size, args);
    let paged = new PagedList<GarbageDropEventRecordViewModel>();
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
    record: async (data: GarbageDropEventRecord) => {
      let vm = new GarbageDropEventRecordViewModel();
      vm = Object.assign(vm, data);
      vm.GarbageStation = this.service.station.cache.get(data.Data.StationId);
      if (vm.Data.DivisionId) {
        vm.Division = this.service.division.cache
          .get(vm.Data.DivisionId)
          .then((division) => {
            return this.converter.division.convert(division);
          });
      }

      vm.images = ObjectTool.model.record.garbagedrop.images(data);

      vm.status = {
        class: this.status.class(data, data.Data.IsTimeout),
        value: Language.GarbageDropEventType(
          data.EventType,
          data.Data.IsTimeout
        ),
      };

      vm.SendTime = formatDate(data.Data.DropTime, Language.HHmmss, 'en');
      if (data.Data.HandleTime) {
        vm.HandleTime = formatDate(data.Data.HandleTime, Language.HHmmss, 'en');
      }

      if (data.Data.TakeMinutes) {
        vm.DropDuration = Language.Time(data.Data.TakeMinutes, 'minute');
      } else if (data.Data.HandleTime) {
        let drop = new Date(data.Data.DropTime.getTime());
        let duration = data.Data.HandleTime.getTime() - drop.getTime();
        vm.DropDuration = Language.Time(duration / 1000 / 60, 'minute');
      } else {
        let now = new Date();
        let drop = new Date(data.Data.DropTime);
        let duration = (now.getTime() - drop.getTime()) / 1000 / 60;
        vm.DropDuration = Language.Time(duration, 'minute');
      }

      return vm;
    },
  };

  status = {
    class: (data: GarbageDropEventRecord, timeout: boolean) => {
      switch (data.EventType) {
        case EventType.GarbageDrop:
          return 'text-orange';
        case EventType.GarbageDropTimeout:
        case EventType.GarbageDropSuperTimeout:
          return 'text-red';
        case EventType.GarbageDropHandle:
          if (timeout) {
            return 'text-cyan';
          } else {
            return 'text-green';
          }

        default:
          return '';
      }
    },
  };

  private data = {
    load: (
      index: number,
      size: number,
      args: GarbageManagementRecordEventGarbageDropListTableArgs
    ) => {
      let params = new GetGarbageDropEventRecordsParams();
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
      return this.service.event.record.GarbageDrop.list(params);
    },
  };
}
