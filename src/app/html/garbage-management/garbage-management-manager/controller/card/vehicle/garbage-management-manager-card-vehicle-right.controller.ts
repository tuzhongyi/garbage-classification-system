import { EventEmitter } from '@angular/core';
import { EventType } from '../../../../../../common/enum/event-type.enum';
import { ColorTool } from '../../../../../../common/tools/color-tool/color.tool';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { GarbageManagementCardChartLineRecordEventComponent } from '../../../../garbage-management-card/garbage-management-card-chart-line-record-event/garbage-management-card-chart-line-record-event.component';
import { GarbageManagementCardDivisionSelectionComponent } from '../../../../garbage-management-card/garbage-management-card-division-selection/garbage-management-card-division-selection/garbage-management-card-division-selection.component';
import { GarbageManagementCardListRecordEventIllegalVehicleComponent } from '../../../../garbage-management-card/garbage-management-card-list-record-event-illegal-vehicle/garbage-management-card-list-record-event-illegal-vehicle.component';
import { GarbageManagementManagerCardItem } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardCommonController } from '../common/garbage-management-manager-card-common.controller';
import { GarbageManagementManagerCardAbstract } from '../garbage-management-manager-card.abstract';

export class GarbageManagementManagerCardVehicleRightController extends GarbageManagementManagerCardAbstract {
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
        type: EventType.IllegalVehicle,
        color: ColorTool.chart.line.get(247, 61, 61),
      },
    },
    {
      component: GarbageManagementCardListRecordEventIllegalVehicleComponent,
      args: {
        load: this.load,
      },
    },
  ];
}
