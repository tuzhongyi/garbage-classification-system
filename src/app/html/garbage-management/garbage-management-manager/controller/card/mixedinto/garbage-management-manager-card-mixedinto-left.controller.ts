import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { GarbageManagementCardChartPieRecordStatisticComponent } from '../../../../garbage-management-card/garbage-management-card-chart-pie-record-statistic/garbage-management-card-chart-pie-record-statistic.component';
import { GarbageManagementCardRankingRecordEventComponent } from '../../../../garbage-management-card/garbage-management-card-ranking-record-event/garbage-management-card-ranking-record-event.component';
import { GarbageManagementRankingRecordEventIndex } from '../../../../garbage-management-ranking/garbage-management-ranking-record-event/garbage-management-ranking-record-event.model';
import { GarbageManagementManagerCardItem } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardAbstract } from '../garbage-management-manager-card.abstract';

export class GarbageManagementManagerCardMixedIntoLeftController extends GarbageManagementManagerCardAbstract {
  constructor(tool: ComponentTool) {
    super(tool);
  }
  protected override ctors: Array<GarbageManagementManagerCardItem> = [
    {
      component: GarbageManagementCardChartPieRecordStatisticComponent,
    },
    {
      component: GarbageManagementCardRankingRecordEventComponent,
      args: {
        display: [
          GarbageManagementRankingRecordEventIndex.mixedinto,
          GarbageManagementRankingRecordEventIndex.garbagefull,
        ],
        index: GarbageManagementRankingRecordEventIndex.mixedinto,
      },
      class: ['span-2'],
    },
  ];
}
