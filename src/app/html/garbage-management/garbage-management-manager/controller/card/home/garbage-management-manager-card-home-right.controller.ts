import { EventEmitter } from '@angular/core';
import { IEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/garbage-event-record.model';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { GarbageManagementCardChartStationCountStateComponent } from '../../../../garbage-management-card/garbage-management-card-chart-station-count-state/garbage-management-card-chart-station-count-state.component';
import { GarbageManagementCardDivisionSelectionComponent } from '../../../../garbage-management-card/garbage-management-card-division-selection/garbage-management-card-division-selection/garbage-management-card-division-selection.component';
import { GarbageManagementCardListRecordEventComponent } from '../../../../garbage-management-card/garbage-management-card-list-record-event/garbage-management-card-list-record-event.component';
import { GarbageManagementManagerCardItem } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerWindow } from '../../../window/garbage-management-manager.window';
import { GarbageManagementManagerCardCommonController } from '../common/garbage-management-manager-card-common.controller';
import { GarbageManagementManagerCardAbstract } from '../garbage-management-manager-card.abstract';

export class GarbageManagementManagerCardHomeRightController extends GarbageManagementManagerCardAbstract {
  event = {
    record: {
      details: new EventEmitter<IEventRecord>(),
      position: new EventEmitter<IEventRecord>(),
    },
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

  private regist() {
    this.event.record.details.subscribe((data) => {
      this.window.record.complete.open(data);
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
      component: GarbageManagementCardChartStationCountStateComponent,
      args: {
        load: this.load,
      },
    },
    {
      component: GarbageManagementCardListRecordEventComponent,
      args: {
        load: this.load,
        details: this.event.record.details,
        position: this.event.record.position,
      },
    },
  ];
}
