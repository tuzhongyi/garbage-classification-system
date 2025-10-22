import { EventType } from '../../../../../common/enum/event-type.enum';
import { IEventRecord } from '../../../../../common/network/model/garbage-station/event-record/garbage-event-record.model';
import { IllegalVehicleEventRecord } from '../../../../../common/network/model/garbage-station/event-record/illegal-vehicle-event-record.model';
import { IasEventRecord } from '../../../../../common/network/model/ias/ias-event-record.model';
import { GarbageManagementRankingRecordEventArgs } from '../../../garbage-management-ranking/garbage-management-ranking-record-event/garbage-management-ranking-record-event.model';
import { GarbageManagementManagerPanel } from '../../panel/garbage-management-manager.panel';
import { GarbageManagementManagerWindow } from '../../window/garbage-management-manager.window';

export class GarbageManagementManagerCardEventTrigger {
  constructor(
    private panel: GarbageManagementManagerPanel,
    private window: GarbageManagementManagerWindow
  ) {}

  record = {
    type: (type: number) => {
      switch (type) {
        case EventType.GarbageFull:
          this.panel.record.garbagefull.open({});
          break;
        case EventType.IllegalDrop:
          this.panel.record.illegaldrop.open({});
          break;
        case EventType.IllegalDrop2:
          this.panel.record.illegaldump.open({});
          break;
        case EventType.MixedInto:
          this.panel.record.mixedinto.open({});
          break;
        case EventType.GarbageDrop:
          this.panel.record.garbagedrop.open({});
          break;
        case EventType.IllegalVehicle:
          this.panel.record.illegalvehicle.open({});
          break;
        case 103:
          this.panel.record.ias.open();
          break;

        default:
          break;
      }
    },
    statistic: (args: GarbageManagementRankingRecordEventArgs) => {
      switch (args.type) {
        case EventType.IllegalDrop:
          this.panel.record.illegaldrop.open(args);
          break;
        case EventType.IllegalDrop2:
          this.panel.record.illegaldump.open(args);
          break;
        case EventType.IllegalVehicle:
          this.panel.record.illegalvehicle.open(args);
          break;
        case EventType.MixedInto:
          this.panel.record.mixedinto.open(args);
          break;
        case EventType.GarbageFull:
          this.panel.record.garbagefull.open(args);
          break;
        case EventType.GarbageDrop:
          this.panel.record.garbagedrop.open(args);
          break;
        default:
          break;
      }
    },
    task: (data: IEventRecord) => {
      this.window.task.complete.open(data);
    },
  };

  ias = {
    task: (data: IasEventRecord) => {
      this.window.task.ias.data = data;
      this.window.task.ias.show = true;
    },
    device: (online: boolean) => {
      this.panel.street.clear();
      this.panel.street.online = online;
      this.panel.street.show = true;
    },
    statistic: () => {
      this.panel.record.ias.show = true;
    },
  };
  vehicle = {
    task: (data: IllegalVehicleEventRecord) => {
      this.window.task.illegalvehicle.data = data;
      this.window.task.illegalvehicle.show = true;
    },
  };
}
