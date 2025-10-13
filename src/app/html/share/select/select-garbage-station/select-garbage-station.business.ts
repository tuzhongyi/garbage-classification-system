import { Injectable } from '@angular/core';
import { StationType } from '../../../../common/enum/station-type.enum';
import { GetGarbageStationsParams } from '../../../../common/network/request/garbage/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from '../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';

@Injectable()
export class SelectGarbageStationBusiness {
  constructor(private service: GarbageStationRequestService) {}

  load(divisionId?: string, types: StationType[] = []) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    if (types.length > 0) {
      params.StationTypes = types;
    }
    return this.service.cache.all(params);
  }
}
