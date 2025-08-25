import { GetGarbageStationsParams } from '../../../../../../common/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from '../../../../../../common/network/request/garbage-station/garbage-station-request.service';
import { GarbageManagementChartStationCountConverter } from './garbage-management-chart-station-count.converter';

export class GarbageManagementChartStationCountBusiness {
  constructor(
    private service: GarbageStationRequestService,
    private converter: GarbageManagementChartStationCountConverter
  ) {}

  async load(divisionId: string) {
    let datas = await this.datas(divisionId);
    let item = this.converter.station(datas);
    return item;
  }

  private datas(divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.AncestorId = divisionId;
    return this.service.cache.all(params);
  }
}
