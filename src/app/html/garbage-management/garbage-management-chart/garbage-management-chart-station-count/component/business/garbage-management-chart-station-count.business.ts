import { Injectable } from '@angular/core';
import { DivisionRequestService } from '../../../../../../common/network/request/garbage/division/division-request.service';
import { GarbageStationRequestService } from '../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { GlobalStorageService } from '../../../../../../common/storage/global.storage';
import { GarbageManagementChartStationCountBusiness } from './garbage-management-chart-station-count-station.business';
import { GarbageManagementChartStationCountConverter } from './garbage-management-chart-station-count.converter';

@Injectable()
export class GarbageManagementChartCountBusiness {
  constructor(
    private service: DivisionRequestService,
    private global: GlobalStorageService,
    station: GarbageStationRequestService
  ) {
    this.station = new GarbageManagementChartStationCountBusiness(
      station,
      this.converter
    );
  }

  private converter = new GarbageManagementChartStationCountConverter();
  private station: GarbageManagementChartStationCountBusiness;

  async load() {
    let division = await this.global.division.selected;
    let data = await this.data(division.Id);

    let station = await this.station.load(division.Id);
    let camera = this.converter.camera(data);
    let wet = this.converter.wet(data);
    return [station, camera, wet];
  }

  private data(divisionId: string) {
    return this.service.statistic.number.get(divisionId);
  }
}
