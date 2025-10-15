import { EventEmitter } from '@angular/core';
import { EventType } from '../../../../../../common/enum/event-type.enum';
import { StationType } from '../../../../../../common/enum/station-type.enum';
import { IEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/garbage-event-record.model';
import { ColorTool } from '../../../../../../common/tools/color-tool/color.tool';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { GarbageManagementCardChartLineRecordEventComponent } from '../../../../garbage-management-card/garbage-management-card-chart-line-record-event/garbage-management-card-chart-line-record-event.component';
import { GarbageManagementCardDivisionSelectionComponent } from '../../../../garbage-management-card/garbage-management-card-division-selection/garbage-management-card-division-selection/garbage-management-card-division-selection.component';
import { GarbageManagementCardListRecordEventComponent } from '../../../../garbage-management-card/garbage-management-card-list-record-event/garbage-management-card-list-record-event.component';
import { GarbageManagementManagerCardItem } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardCommonController } from '../common/garbage-management-manager-card-common.controller';
import { GarbageManagementManagerCardAbstract } from '../garbage-management-manager-card.abstract';

export class GarbageManagementManagerCardIllegalDumpRightController extends GarbageManagementManagerCardAbstract {
  event = {
    record: {
      details: new EventEmitter<IEventRecord>(),
      position: new EventEmitter<IEventRecord>(),
    },
  };
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
      component: GarbageManagementCardChartLineRecordEventComponent,
      args: {
        load: this.load,
        type: EventType.IllegalDrop2,
        color: ColorTool.chart.line.record.illegaldump,
      },
    },
    {
      component: GarbageManagementCardListRecordEventComponent,
      args: {
        load: this.load,
        types: [StationType.IllegalDump],
        details: this.event.record.details,
        position: this.event.record.position,
      },
    },
  ];
}
