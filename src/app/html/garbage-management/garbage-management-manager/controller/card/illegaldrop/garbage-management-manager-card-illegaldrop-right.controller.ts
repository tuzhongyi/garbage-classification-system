import * as echarts from 'echarts';
import { EventType } from '../../../../../../common/enum/event-type.enum';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { GarbageManagementCardChartLineRecordEventComponent } from '../../../../garbage-management-card/garbage-management-card-chart-line-record-event/garbage-management-card-chart-line-record-event.component';
import { GarbageManagementCardChartStationCountStateComponent } from '../../../../garbage-management-card/garbage-management-card-chart-station-count-state/garbage-management-card-chart-station-count-state.component';
import { GarbageManagementManagerCardItem } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardAbstract } from '../garbage-management-manager-card.abstract';

export class GarbageManagementManagerCardIllegalDropRightController extends GarbageManagementManagerCardAbstract {
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
        type: EventType.IllegalDrop,
        color: {
          area: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255, 140, 0, 0.7)',
            },
            {
              offset: 1,
              color: 'rgba(255, 140, 0, 0)',
            },
          ]),
          line: '#ff8c00',
          point: {
            border: '#ff8c00',
            background: '#18164f',
          },
        },
      },
    },
    {
      component: GarbageManagementCardChartLineRecordEventComponent,
      args: {
        type: EventType.GarbageDrop,
        color: {
          area: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255, 255, 0, 0.7)',
            },
            {
              offset: 1,
              color: 'rgba(255, 255, 0, 0)',
            },
          ]),
          line: '#ffff00',
          point: {
            border: '#ffff00',
            background: '#000',
          },
        },
      },
    },
  ];
}
