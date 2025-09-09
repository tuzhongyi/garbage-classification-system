import { Injectable } from '@angular/core';
import { Duration } from '../../../../../../common/network/model/garbage-station/duration.model';
import { EventRequestService } from '../../../../../../common/network/request/garbage/event/event-request.service';
import { GlobalStorageService } from '../../../../../../common/storage/global.storage';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { GarbageManagementChartStationCountItem } from '../../garbage-management-chart-station-count-item/garbage-management-chart-station-count-item.model';
import { GarbageManagementChartStationCountStateGarbageDropBusiness } from './garbage-management-chart-station-count-state-garbage-drop.business';
import { GarbageManagementChartStationCountStateGarbageFullBusiness } from './garbage-management-chart-station-count-state-garbage-full.business';
import { GarbageManagementChartStationCountStateMixedIntoBusiness } from './garbage-management-chart-station-count-state-mixed-into.business';
import { GarbageManagementChartStationCountStateConverter } from './garbage-management-chart-station-count-state.converter';

@Injectable()
export class GarbageManagementChartStationCountStateBusiness {
  constructor(
    service: EventRequestService,
    private global: GlobalStorageService
  ) {
    this.service = {
      garbagefull:
        new GarbageManagementChartStationCountStateGarbageFullBusiness(service),
      mixedinto: new GarbageManagementChartStationCountStateMixedIntoBusiness(
        service
      ),
      garbagedrop:
        new GarbageManagementChartStationCountStateGarbageDropBusiness(service),
    };
  }

  private service: {
    garbagefull: GarbageManagementChartStationCountStateGarbageFullBusiness;
    mixedinto: GarbageManagementChartStationCountStateMixedIntoBusiness;
    garbagedrop: GarbageManagementChartStationCountStateGarbageDropBusiness;
  };

  private converter = new GarbageManagementChartStationCountStateConverter();

  async load(): Promise<GarbageManagementChartStationCountItem[]> {
    let division = await this.global.division.selected;
    let duration = DateTimeTool.allDay(new Date());
    let garbagefull = this.garbagefull(division.Id, duration);
    let garbagedrop = this.garbagedrop(division.Id, duration);
    let mixedinto = this.mixedinto(division.Id, duration);

    let all = [mixedinto, garbagefull, garbagedrop];

    return Promise.all(all);
  }

  private async garbagefull(divisionId: string, duration: Duration) {
    let data = await this.service.garbagefull.load(divisionId, duration);
    let item = this.converter.garbagefull(data);
    return item;
  }
  private async garbagedrop(divisionId: string, duration: Duration) {
    let data = await this.service.garbagedrop.load(divisionId, duration);
    let item = this.converter.garbagedrop(data);
    return item;
  }
  private async mixedinto(divisionId: string, duration: Duration) {
    let data = await this.service.mixedinto.load(divisionId, duration);
    let item = this.converter.mixedinto(data);
    return item;
  }
}
