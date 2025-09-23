import { EventEmitter } from '@angular/core';
import { IasEventRecord } from '../../../../../../common/network/model/ias/ias-event-record.model';
import { ColorTool } from '../../../../../../common/tools/color-tool/color.tool';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { GarbageManagementCardChartLineRecordEventIasComponent } from '../../../../garbage-management-card/garbage-management-card-chart-line-record-event-ias/garbage-management-card-chart-line-record-event-ias.component';
import { GarbageManagementCardDivisionSelectionComponent } from '../../../../garbage-management-card/garbage-management-card-division-selection/garbage-management-card-division-selection/garbage-management-card-division-selection.component';
import { GarbageManagementCardListRecordEventIasComponent } from '../../../../garbage-management-card/garbage-management-card-list-record-event-ias/garbage-management-card-list-record-event-ias.component';
import { GarbageManagementManagerCardItem } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerWindow } from '../../../window/garbage-management-manager.window';
import { GarbageManagementManagerCardCommonController } from '../common/garbage-management-manager-card-common.controller';
import { GarbageManagementManagerCardAbstract } from '../garbage-management-manager-card.abstract';

export class GarbageManagementManagerCardStreetRightController extends GarbageManagementManagerCardAbstract {
  event = {
    task: new EventEmitter<IasEventRecord>(),
  };

  constructor(
    common: GarbageManagementManagerCardCommonController,
    tool: ComponentTool,
    load: EventEmitter<void>,
    private window: GarbageManagementManagerWindow
  ) {
    super(common, tool);
    load.subscribe(() => {
      this.load.emit();
    });
    this.regist();
  }
  private load = new EventEmitter<void>();

  private regist() {
    this.event.task.subscribe((x) => {
      this.window.record.ias.data = x;
      this.window.record.ias.show = true;
    });
  }

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
        task: this.event.task,
      },
    },
  ];
}
