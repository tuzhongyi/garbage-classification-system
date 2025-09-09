import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { GarbageManagementCardChartStationCountStateComponent } from '../../../../garbage-management-card/garbage-management-card-chart-station-count-state/garbage-management-card-chart-station-count-state.component';
import { GarbageManagementCardListRecordEventComponent } from '../../../../garbage-management-card/garbage-management-card-list-record-event/garbage-management-card-list-record-event.component';
import { GarbageManagementCardRankingRecordEventComponent } from '../../../../garbage-management-card/garbage-management-card-ranking-record-event/garbage-management-card-ranking-record-event.component';
import { GarbageManagementRankingRecordEventIndex } from '../../../../garbage-management-ranking/garbage-management-ranking-record-event/garbage-management-ranking-record-event.model';
import { GarbageManagementManagerCardItem } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardAbstract } from '../garbage-management-manager-card.abstract';

export class GarbageManagementManagerCardHomeRightController extends GarbageManagementManagerCardAbstract {
  constructor(tool: ComponentTool) {
    super(tool);
  }
  protected override ctors: Array<GarbageManagementManagerCardItem> = [
    {
      component: GarbageManagementCardRankingRecordEventComponent,
      args: {
        display: [GarbageManagementRankingRecordEventIndex.illegalvehicle],
        index: GarbageManagementRankingRecordEventIndex.illegalvehicle,
      },
    },
    {
      component: GarbageManagementCardChartStationCountStateComponent,
    },
    {
      component: GarbageManagementCardListRecordEventComponent,
    },
  ];
}
