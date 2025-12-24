import { GarbageManagementManagerComponent } from '../../garbage-management-manager.component';
import { GarbageManagementManagerIndex } from '../../garbage-management-manager.model';
import { GarbageManagementManagerDisplayIasRecordState } from './display/garbage-management-manager-display-ias-record.state';
import { GarbageManagementManagerExtendControlState } from './extend/garbage-management-manager-extend-control.panel';
import { GarbageManagementManagerExtendHeatmapState } from './extend/garbage-management-manager-extend-heatmap.panel';

export class GarbageManagementManagerStateController {
  statistic = {
    show: true,
  };

  display = {
    station: {
      show: true,
    },
    ias: {
      record: new GarbageManagementManagerDisplayIasRecordState(),
    },
  };

  extend: {
    heatmap: GarbageManagementManagerExtendHeatmapState;
    control: GarbageManagementManagerExtendControlState;
  };

  constructor(that: GarbageManagementManagerComponent) {
    this.extend = {
      heatmap: new GarbageManagementManagerExtendHeatmapState(that),
      control: new GarbageManagementManagerExtendControlState(that),
    };
  }

  on = {
    index: (index: GarbageManagementManagerIndex) => {
      switch (index) {
        case GarbageManagementManagerIndex.home:
          this.statistic.show = true;
          this.display.station.show = true;
          this.display.ias.record.show = false;
          this.extend.heatmap.show = false;
          this.extend.control.show = false;
          break;
        case GarbageManagementManagerIndex.garbagestation:
          this.statistic.show = true;
          this.display.station.show = true;
          this.display.ias.record.show = false;
          this.extend.heatmap.show = false;
          this.extend.control.show = false;
          break;
        case GarbageManagementManagerIndex.illegaldump:
          this.statistic.show = true;
          this.display.station.show = true;
          this.display.ias.record.show = false;
          this.extend.heatmap.show = false;
          this.extend.control.show = false;
          break;
        case GarbageManagementManagerIndex.vehicle:
          this.statistic.show = true;
          this.display.station.show = true;
          this.display.ias.record.show = false;
          this.extend.heatmap.show = false;
          this.extend.control.show = false;
          break;
        case GarbageManagementManagerIndex.street:
          this.statistic.show = true;
          this.display.station.show = false;
          this.display.ias.record.show = true;
          this.extend.control.show = true;
          this.extend.heatmap.show = false;
          break;

        default:
          break;
      }
    },
  };
}
