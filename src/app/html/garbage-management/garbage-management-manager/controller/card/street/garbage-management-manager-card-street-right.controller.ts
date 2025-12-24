import { EventEmitter } from '@angular/core';
import { GridCell } from '../../../../../../common/network/model/garbage-station/grid-cell.model';
import { IasEventRecord } from '../../../../../../common/network/model/ias/ias-event-record.model';
import { ColorTool } from '../../../../../../common/tools/color-tool/color.tool';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { GarbageManagementCardChartLineRecordEventIasComponent } from '../../../../garbage-management-card/garbage-management-card-chart-line-record-event-ias/garbage-management-card-chart-line-record-event-ias.component';
import { GarbageManagementCardGridCellSelectionComponent } from '../../../../garbage-management-card/garbage-management-card-grid-cell-selection/garbage-management-card-grid-cell-selection.component';
import { GarbageManagementCardListRecordEventIasComponent } from '../../../../garbage-management-card/garbage-management-card-list-record-event-ias/garbage-management-card-list-record-event-ias.component';
import { GarbageManagementManagerCardItem } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardCommonController } from '../common/garbage-management-manager-card-common.controller';
import { GarbageManagementManagerCardAbstract } from '../garbage-management-manager-card.abstract';

export class GarbageManagementManagerCardStreetRightController extends GarbageManagementManagerCardAbstract {
  event = {
    task: new EventEmitter<IasEventRecord>(),
    position: new EventEmitter<IasEventRecord>(),
    gridcell: new EventEmitter<GridCell>(),
  };
  select = new EventEmitter<GridCell>();
  load = new EventEmitter<{ gridcellId?: string }>();
  constructor(
    common: GarbageManagementManagerCardCommonController,
    tool: ComponentTool
  ) {
    super(common, tool);
  }

  protected override ctors: Array<GarbageManagementManagerCardItem> = [
    {
      component: GarbageManagementCardGridCellSelectionComponent,
      args: {
        selectedChange: this.event.gridcell,
        select: this.select,
      },
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
        task: this.event.task,
        itemclick: this.event.position,
      },
    },
  ];
}
