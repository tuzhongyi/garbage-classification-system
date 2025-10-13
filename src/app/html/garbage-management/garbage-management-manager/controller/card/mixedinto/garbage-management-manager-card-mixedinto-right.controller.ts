import { EventEmitter } from '@angular/core';
import { EventType } from '../../../../../../common/enum/event-type.enum';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { GarbageManagementCardChartLineRecordEventMultipleComponent } from '../../../../garbage-management-card/garbage-management-card-chart-line-record-event-multiple/garbage-management-card-chart-line-record-event-multiple.component';
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
      selector: 'app-garbage-management-card-division-selection',
    },
    {
      component: GarbageManagementCardChartLineRecordEventMultipleComponent,
      args: {
        load: this.load,
        types: [EventType.MixedInto, EventType.GarbageFull],
      },
    },
    {
      component: GarbageManagementCardChartLineRecordEventMultipleComponent,
      args: {
        load: this.load,
        types: [EventType.IllegalDrop, EventType.GarbageDrop],
      },
    },
  ];
}
