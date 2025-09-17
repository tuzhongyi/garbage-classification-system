import { EventEmitter } from '@angular/core';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { GarbageManagementCardChartPieRecordStatisticComponent } from '../../../../garbage-management-card/garbage-management-card-chart-pie-record-statistic/garbage-management-card-chart-pie-record-statistic.component';
import { GarbageManagementCardRankingRecordEventComponent } from '../../../../garbage-management-card/garbage-management-card-ranking-record-event/garbage-management-card-ranking-record-event.component';
import { GarbageManagementRankingRecordEventIndex } from '../../../../garbage-management-ranking/garbage-management-ranking-record-event/garbage-management-ranking-record-event.model';
import { GarbageManagementManagerCardItem } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardCommonController } from '../common/garbage-management-manager-card-common.controller';
import { GarbageManagementManagerCardAbstract } from '../garbage-management-manager-card.abstract';

export class GarbageManagementManagerCardHomeLeftController extends GarbageManagementManagerCardAbstract {
  constructor(
    common: GarbageManagementManagerCardCommonController,
    tool: ComponentTool,
    load: EventEmitter<void>
  ) {
    super(common, tool);
    load.subscribe(() => {
      this.load.emit();
    });
  }
  private load = new EventEmitter<void>();
  protected override ctors: Array<GarbageManagementManagerCardItem> = [
    {
      component: GarbageManagementCardChartPieRecordStatisticComponent,
      args: {
        load: this.load,
      },
      single: true,
    },
    {
      component: GarbageManagementCardRankingRecordEventComponent,
      args: {
        load: this.load,
        display: [
          GarbageManagementRankingRecordEventIndex.mixedinto,
          GarbageManagementRankingRecordEventIndex.garbagefull,
        ],
        index: GarbageManagementRankingRecordEventIndex.mixedinto,
      },
    },
    {
      component: GarbageManagementCardRankingRecordEventComponent,
      args: {
        load: this.load,
        display: [
          GarbageManagementRankingRecordEventIndex.illegaldrop,
          GarbageManagementRankingRecordEventIndex.garbagedropduration,
          GarbageManagementRankingRecordEventIndex.garbagedropcount,
        ],
        index: GarbageManagementRankingRecordEventIndex.illegaldrop,
      },
    },
  ];
}
