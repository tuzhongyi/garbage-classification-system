import { Injectable } from '@angular/core';
import { EventType } from '../../../../../../common/enum/event-type.enum';
import { DivisionNumberStatistic } from '../../../../../../common/network/model/garbage-station/division-number-statistic.model';
import { IasEventRecord } from '../../../../../../common/network/model/ias/ias-event-record.model';
import { PagedList } from '../../../../../../common/network/model/page_list.model';
import { GlobalStorageService } from '../../../../../../common/storage/global.storage';
import { ChartItem } from '../../../garbage-management-chart.abstract';

import { DivisionNumberStatisticV2 } from '../../../../../../common/network/model/garbage-station/division-number-statistic-v2.model';
import { EventNumber } from '../../../../../../common/network/model/garbage-station/event-number.model';
import { Language } from '../../../../../../common/tools/language';
import { GarbageManagementChartPieRecordStatisticContainerArgs } from './garbage-management-chart-pie-record-statistic-container.model';
import { GarbageManagementChartPieRecordStatisticContainerService } from './service/garbage-management-chart-pie-record-statistic-container.service';

@Injectable()
export class GarbageManagementChartPieRecordStatisticContainerBusiness {
  constructor(
    private service: GarbageManagementChartPieRecordStatisticContainerService,
    private global: GlobalStorageService
  ) {}

  async load(args: GarbageManagementChartPieRecordStatisticContainerArgs) {
    let division = await this.global.division.selected;
    let data = {
      division: await this.service.division.load(division.Id, args.unit),
      ias: await this.service.ias.load(division.Id, args.unit),
    };
    let mixedinfo = this.convert.statistic(EventType.MixedInto, data.division);
    let garbagefull = this.convert.statistic(
      EventType.GarbageFull,
      data.division
    );
    let illegaldrop = this.convert.statistic(
      EventType.IllegalDrop,
      data.division
    );
    let garbagedrop = this.convert.statistic(
      EventType.GarbageDrop,
      data.division
    );
    let illegalvehicle = this.convert.statistic(
      EventType.IllegalVehicle,
      data.division
    );
    let garbageexposed = this.convert.ias(data.ias);
    return [
      mixedinfo,
      garbagefull,
      illegaldrop,
      garbagedrop,
      illegalvehicle,
      garbageexposed,
    ];
  }

  private convert = {
    statistic: (
      type: EventType,
      data?: DivisionNumberStatistic | DivisionNumberStatisticV2
    ) => {
      let event: EventNumber | undefined = undefined;
      if (data instanceof DivisionNumberStatistic) {
        event = data.TodayEventNumbers?.find((x) => x.EventType === type);
      } else if (data instanceof DivisionNumberStatisticV2) {
        event = data.EventNumbers?.find((x) => x.EventType === type);
      }

      let item: ChartItem = {
        id: type,
        name: Language.EventType(type),
        value: event?.DayNumber || 0,
      };
      return item;
    },
    ias: (data: PagedList<IasEventRecord>) => {
      let item: ChartItem = {
        id: 0,
        name: '垃圾暴露',
        value: data.Page.TotalRecordCount || 0,
      };
      return item;
    },
  };
}
