import { Injectable } from '@angular/core';
import { StationType } from '../../../../common/enum/station-type.enum';
import { GetGarbageStationsParams } from '../../../../common/network/request/garbage/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from '../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { LocaleCompare } from '../../../../common/tools/locale-compare';

@Injectable()
export class SelectGarbageStationBusiness {
  constructor(private service: GarbageStationRequestService) {}

  load(divisionId?: string, types: StationType[] = []) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    if (types.length > 0) {
      params.StationTypes = types;
    }
    return this.service.cache.array(params).then((x) => {
      return x.sort((a, b) => {
        return LocaleCompare.compare(a.Name, b.Name);
      });
    });
  }
}
