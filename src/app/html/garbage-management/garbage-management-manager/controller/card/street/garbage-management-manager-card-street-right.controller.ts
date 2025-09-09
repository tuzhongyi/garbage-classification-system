import * as echarts from 'echarts';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { GarbageManagementCardChartLineRecordEventIasComponent } from '../../../../garbage-management-card/garbage-management-card-chart-line-record-event-ias/garbage-management-card-chart-line-record-event-ias.component';
import { GarbageManagementCardChartStationCountStateComponent } from '../../../../garbage-management-card/garbage-management-card-chart-station-count-state/garbage-management-card-chart-station-count-state.component';
import { GarbageManagementCardListRecordEventIasComponent } from '../../../../garbage-management-card/garbage-management-card-list-record-event-ias/garbage-management-card-list-record-event-ias.component';
import { GarbageManagementManagerCardItem } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardAbstract } from '../garbage-management-manager-card.abstract';

export class GarbageManagementManagerCardStreetRightController extends GarbageManagementManagerCardAbstract {
  constructor(tool: ComponentTool) {
    super(tool);
  }
  protected override ctors: Array<GarbageManagementManagerCardItem> = [
    {
      component: GarbageManagementCardChartStationCountStateComponent,
    },
    {
      component: GarbageManagementCardChartLineRecordEventIasComponent,
      args: {
        color: {
          area: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(0, 179, 255, 0.7)',
            },
            {
              offset: 1,
              color: 'rgba(0, 179, 255, 0)',
            },
          ]),
          line: '#00b3ff',
          point: {
            border: '#00b3ff',
            background: '#18164f',
          },
        },
      },
    },
    {
      component: GarbageManagementCardListRecordEventIasComponent,
    },
  ];
}
