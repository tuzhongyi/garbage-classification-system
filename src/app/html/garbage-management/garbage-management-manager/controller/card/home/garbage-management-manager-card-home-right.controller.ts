import { EventEmitter } from '@angular/core';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { GarbageManagementCardChartStationCountStateComponent } from '../../../../garbage-management-card/garbage-management-card-chart-station-count-state/garbage-management-card-chart-station-count-state.component';
import { GarbageManagementCardDivisionSelectionComponent } from '../../../../garbage-management-card/garbage-management-card-division-selection/garbage-management-card-division-selection/garbage-management-card-division-selection.component';
import { GarbageManagementCardListRecordEventComponent } from '../../../../garbage-management-card/garbage-management-card-list-record-event/garbage-management-card-list-record-event.component';
import { GarbageManagementManagerCardItem } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardCommonController } from '../common/garbage-management-manager-card-common.controller';
import { GarbageManagementManagerCardAbstract } from '../garbage-management-manager-card.abstract';

export class GarbageManagementManagerCardHomeRightController extends GarbageManagementManagerCardAbstract {
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
      component: GarbageManagementCardChartStationCountStateComponent,
      args: {
        load: this.load,
      },
    },
    {
      component: GarbageManagementCardListRecordEventComponent,
      args: {
        load: this.load,
      },
    },
  ];
}
