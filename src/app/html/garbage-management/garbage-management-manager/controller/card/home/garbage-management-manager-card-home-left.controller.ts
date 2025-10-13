import { EventEmitter } from '@angular/core';
import { EventType } from '../../../../../../common/enum/event-type.enum';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { GarbageManagementCardChartPieRecordStatisticComponent } from '../../../../garbage-management-card/garbage-management-card-chart-pie-record-statistic/garbage-management-card-chart-pie-record-statistic.component';
import { GarbageManagementCardRankingRecordEventComponent } from '../../../../garbage-management-card/garbage-management-card-ranking-record-event/garbage-management-card-ranking-record-event.component';
import { GarbageManagementRankingRecordEventIndex } from '../../../../garbage-management-ranking/garbage-management-ranking-record-event/garbage-management-ranking-record-event.model';
import { GarbageManagementManagerCardItem } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerPanel } from '../../../panel/garbage-management-manager.panel';
import { GarbageManagementManagerCardCommonController } from '../common/garbage-management-manager-card-common.controller';
import { GarbageManagementManagerCardAbstract } from '../garbage-management-manager-card.abstract';

export class GarbageManagementManagerCardHomeLeftController extends GarbageManagementManagerCardAbstract {
  event = {
    recordopen: new EventEmitter<number>(),
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
    this.event.recordopen.subscribe((x) => {
      switch (x) {
        case EventType.GarbageFull:
          this.panel.record.garbagefull.open();
          break;
        case EventType.IllegalDrop:
          this.panel.record.illegaldrop.open();
          break;
        case EventType.IllegalDrop2:
          this.panel.record.illegaldump.open();
          break;
        case EventType.MixedInto:
          this.panel.record.mixedinto.open();
          break;
        case EventType.GarbageDrop:
          this.panel.record.garbagedrop.open();
          break;
        case EventType.IllegalVehicle:
          this.panel.record.illegalvehicle.open();
          break;
        case 103:
          this.panel.record.ias.open();
          break;

        default:
          break;
      }
    });
  }

  private load = new EventEmitter<void>();
  protected override ctors: Array<GarbageManagementManagerCardItem> = [
    {
      component: GarbageManagementCardChartPieRecordStatisticComponent,
      args: {
        load: this.load,
        itemclick: this.event.recordopen,
      },
      single: true,
      selector: 'app-garbage-management-card-chart-pie-record-statistic',
    },
    {
      component: GarbageManagementCardRankingRecordEventComponent,
      args: {
        load: this.load,
        display: [
          GarbageManagementRankingRecordEventIndex.mixedinto,
          GarbageManagementRankingRecordEventIndex.garbagefull,
          GarbageManagementRankingRecordEventIndex.illegaldrop,
          GarbageManagementRankingRecordEventIndex.garbagedropduration,
          GarbageManagementRankingRecordEventIndex.garbagedropcount,
        ],
        index: GarbageManagementRankingRecordEventIndex.mixedinto,
      },
    },
    {
      component: GarbageManagementCardRankingRecordEventComponent,
      args: {
        load: this.load,
        display: [
          GarbageManagementRankingRecordEventIndex.illegaldump,
          GarbageManagementRankingRecordEventIndex.illegalvehicle,
        ],
        index: GarbageManagementRankingRecordEventIndex.illegaldump,
      },
    },
  ];
}
