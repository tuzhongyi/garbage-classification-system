import { EventEmitter } from '@angular/core';
import { ColorTool } from '../../../../../../common/tools/color-tool/color.tool';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { GarbageManagementCardChartLineRecordEventIasComponent } from '../../../../garbage-management-card/garbage-management-card-chart-line-record-event-ias/garbage-management-card-chart-line-record-event-ias.component';
import { GarbageManagementCardDivisionSelectionComponent } from '../../../../garbage-management-card/garbage-management-card-division-selection/garbage-management-card-division-selection/garbage-management-card-division-selection.component';
import { GarbageManagementCardListRecordEventIasComponent } from '../../../../garbage-management-card/garbage-management-card-list-record-event-ias/garbage-management-card-list-record-event-ias.component';
import { GarbageManagementManagerCardItem } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardCommonController } from '../common/garbage-management-manager-card-common.controller';
import { GarbageManagementManagerCardAbstract } from '../garbage-management-manager-card.abstract';

export class GarbageManagementManagerCardStreetRightController extends GarbageManagementManagerCardAbstract {
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
      component: GarbageManagementCardChartLineRecordEventIasComponent,
      args: {
        load: this.load,
        color: ColorTool.chart.line.get(0, 179, 255),
      },
    },
    {
      component: GarbageManagementCardListRecordEventIasComponent,
      args: {
        load: this.load,
      },
    },
  ];
}
