import { Injectable } from '@angular/core';
import { GarbageStation } from '../../../../../../../common/network/model/garbage-station/garbage-station.model';
import { PagedList } from '../../../../../../../common/network/model/page_list.model';
import { GetGarbageStationsParams } from '../../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from '../../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { GlobalStorageService } from '../../../../../../../common/storage/global.storage';
import { GarbageStationTableConverter } from './garbage-station-table.converter';
import {
  GarbageStationTableArgs,
  GarbageStationTableModel,
} from './garbage-station-table.model';

@Injectable()
export class GarbageStationTableBusiness {
  constructor(
    private storeService: GlobalStorageService,
    private stationService: GarbageStationRequestService,
    public Converter: GarbageStationTableConverter
  ) {}
  async load(
    index: number,
    size: number,
    args: GarbageStationTableArgs
  ): Promise<PagedList<GarbageStationTableModel>> {
    let divisionId = args.divisionId;
    if (!divisionId) {
      let division = await this.storeService.division.selected;
      divisionId = division.Id;
    }
    let data = await this.getData(index, size, divisionId, args);
    let paged = new PagedList<GarbageStationTableModel>();
    paged.Page = data.Page;
    paged.Data = data.Data.map((x) => this.Converter.convert(x));
    return paged;
  }
  getData(
    index: number,
    size: number,
    divisionId: string,
    args: GarbageStationTableArgs
  ): Promise<PagedList<GarbageStation>> {
    let params = new GetGarbageStationsParams();
    params.PageIndex = index;
    params.PageSize = size;

    params.DivisionId = divisionId;
    if (args.stationId) {
      params.Ids = [args.stationId];
    }

    if (args.state != undefined) {
      if (args.state === 0) {
        params.StationState = args.state;
      } else {
        let state = '1';
        state = state.padEnd(args.state, '0');
        params.StationState = parseInt(state, 2);
      }
    }

    params.StationType = args.type;
    params.CommunityName = args.communityName;
    params.Name = args.stationName;

    return this.stationService.list(params);
  }
}
