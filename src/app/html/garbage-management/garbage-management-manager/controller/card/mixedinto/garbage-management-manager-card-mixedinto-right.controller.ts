import { EventEmitter } from '@angular/core';
import { EventType } from '../../../../../../common/enum/event-type.enum';
import { ColorTool } from '../../../../../../common/tools/color-tool/color.tool';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { GarbageManagementCardChartLineRecordEventComponent } from '../../../../garbage-management-card/garbage-management-card-chart-line-record-event/garbage-management-card-chart-line-record-event.component';
import { GarbageManagementCardDivisionSelectionComponent } from '../../../../garbage-management-card/garbage-management-card-division-selection/garbage-management-card-division-selection/garbage-management-card-division-selection.component';
import { GarbageManagementManagerCardItem } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardCommonController } from '../common/garbage-management-manager-card-common.controller';
import { GarbageManagementManagerCardAbstract } from '../garbage-management-manager-card.abstract';

export class GarbageManagementManagerCardMixedIntoRightController extends GarbageManagementManagerCardAbstract {
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
      component: GarbageManagementCardDivisionSelectionComponent,
      single: true,
    },
    {
      component: GarbageManagementCardChartLineRecordEventComponent,
      args: {
        load: this.load,
        type: EventType.MixedInto,
        color: ColorTool.chart.line.get(0, 255, 255),
      },
    },
    {
      component: GarbageManagementCardChartLineRecordEventComponent,
      args: {
        load: this.load,
        type: EventType.GarbageFull,
        color: ColorTool.chart.line.get(255, 0, 240),
      },
    },
  ];
}
