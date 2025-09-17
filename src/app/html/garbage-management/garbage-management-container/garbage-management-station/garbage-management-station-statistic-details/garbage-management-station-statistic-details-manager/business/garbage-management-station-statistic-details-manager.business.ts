import { Injectable } from '@angular/core';
import { GetGarbageStationsParams } from '../../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from '../../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { GlobalStorageService } from '../../../../../../../common/storage/global.storage';
import { LocaleCompare } from '../../../../../../../common/tools/locale-compare';

@Injectable()
export class GarbageManagementStationStatisticDetailsManagerBusiness {
  constructor(
    private service: GarbageStationRequestService,
    private global: GlobalStorageService
  ) {}

  async load() {
    let division = await this.global.division.selected;
    let params = new GetGarbageStationsParams();
    params.AncestorId = division.Id;
    return this.service.cache.all(params).then((x) => {
      return x.sort((a, b) => {
        return LocaleCompare.compare(a.Name, b.Name);
      });
    });
  }
}
