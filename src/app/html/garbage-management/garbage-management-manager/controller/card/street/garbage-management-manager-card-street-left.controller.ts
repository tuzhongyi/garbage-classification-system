import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { GarbageManagementCardChartIasDeviceStateComponent } from '../../../../garbage-management-card/garbage-management-card-chart-ias-device-state/garbage-management-card-chart-ias-device-state.component';
import { GarbageManagementCardChartPieRecordStatisticComponent } from '../../../../garbage-management-card/garbage-management-card-chart-pie-record-statistic/garbage-management-card-chart-pie-record-statistic.component';
import { GarbageManagementCardRankingRecordEventIasComponent } from '../../../../garbage-management-card/garbage-management-card-ranking-record-event-ias/garbage-management-card-ranking-record-event-ias.component';

import { GarbageManagementManagerCardItem } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardAbstract } from '../garbage-management-manager-card.abstract';

export class GarbageManagementManagerCardStreetLeftController extends GarbageManagementManagerCardAbstract {
  constructor(tool: ComponentTool) {
    super(tool);
  }
  protected override ctors: Array<GarbageManagementManagerCardItem> = [
    {
      component: GarbageManagementCardChartPieRecordStatisticComponent,
    },
    {
      component: GarbageManagementCardChartIasDeviceStateComponent,
    },
    {
      component: GarbageManagementCardRankingRecordEventIasComponent,
    },
  ];
}
