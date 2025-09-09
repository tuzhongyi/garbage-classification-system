import * as echarts from 'echarts';
import { EventType } from '../../../../../../common/enum/event-type.enum';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { GarbageManagementCardChartLineRecordEventComponent } from '../../../../garbage-management-card/garbage-management-card-chart-line-record-event/garbage-management-card-chart-line-record-event.component';
import { GarbageManagementCardChartStationCountStateComponent } from '../../../../garbage-management-card/garbage-management-card-chart-station-count-state/garbage-management-card-chart-station-count-state.component';
import { GarbageManagementCardListRecordEventIllegalVehicleComponent } from '../../../../garbage-management-card/garbage-management-card-list-record-event-illegal-vehicle/garbage-management-card-list-record-event-illegal-vehicle.component';
import { GarbageManagementManagerCardItem } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardAbstract } from '../garbage-management-manager-card.abstract';

export class GarbageManagementManagerCardVehicleRightController extends GarbageManagementManagerCardAbstract {
  constructor(tool: ComponentTool) {
    super(tool);
  }
  protected override ctors: Array<GarbageManagementManagerCardItem> = [
    {
      component: GarbageManagementCardChartStationCountStateComponent,
    },
    {
      component: GarbageManagementCardChartLineRecordEventComponent,
      args: {
        type: EventType.IllegalVehicle,
        color: {
          area: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(247, 61, 61, 0.7)',
            },
            {
              offset: 1,
              color: 'rgba(247, 61, 61, 0)',
            },
          ]),
          line: '#f73d3d',
          point: {
            border: '#f73d3d',
            background: '#18164f',
          },
        },
      },
    },
    {
      component: GarbageManagementCardListRecordEventIllegalVehicleComponent,
    },
  ];
}
