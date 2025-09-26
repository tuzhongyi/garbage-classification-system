import { EventEmitter } from '@angular/core';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { GarbageManagementCardChartIasDeviceStateComponent } from '../../../../garbage-management-card/garbage-management-card-chart-ias-device-state/garbage-management-card-chart-ias-device-state.component';
import { GarbageManagementCardChartPieRecordStatisticComponent } from '../../../../garbage-management-card/garbage-management-card-chart-pie-record-statistic/garbage-management-card-chart-pie-record-statistic.component';
import { GarbageManagementCardRankingRecordEventIasComponent } from '../../../../garbage-management-card/garbage-management-card-ranking-record-event-ias/garbage-management-card-ranking-record-event-ias.component';

import { GarbageManagementManagerCardItem } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerPanel } from '../../../panel/garbage-management-manager.panel';
import { GarbageManagementManagerCardCommonController } from '../common/garbage-management-manager-card-common.controller';
import { GarbageManagementManagerCardAbstract } from '../garbage-management-manager-card.abstract';

export class GarbageManagementManagerCardStreetLeftController extends GarbageManagementManagerCardAbstract {
  event = {
    device: new EventEmitter<boolean>(),
    record: new EventEmitter<void>(),
  };
  constructor(
    common: GarbageManagementManagerCardCommonController,
    tool: ComponentTool,
    load: EventEmitter<void>,
    private panel: GarbageManagementManagerPanel
  ) {
    super(common, tool);
    load.subscribe(() => {
      this.load.emit();
    });
    this.regist();
  }
  private regist() {
    this.event.device.subscribe((online) => {
      this.panel.street.clear();
      this.panel.street.online = online;
      this.panel.street.show = true;
    });
    this.event.record.subscribe(() => {
      this.panel.record.ias.show = true;
    });
  }
  private load = new EventEmitter<void>();
  protected override ctors: Array<GarbageManagementManagerCardItem> = [
    {
      component: GarbageManagementCardChartPieRecordStatisticComponent,
      args: {
        load: this.load,
      },
      single: true,
      selector: 'app-garbage-management-card-chart-pie-record-statistic',
    },
    {
      component: GarbageManagementCardChartIasDeviceStateComponent,
      args: {
        load: this.load,
        itemclick: this.event.device,
      },
    },
    {
      component: GarbageManagementCardRankingRecordEventIasComponent,
      args: {
        load: this.load,
        itemclick: this.event.record,
      },
    },
  ];
}
