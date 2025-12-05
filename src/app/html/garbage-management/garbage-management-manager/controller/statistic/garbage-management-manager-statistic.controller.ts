import { StationType } from '../../../../../common/enum/station-type.enum';
import { GarbageManagementManagerComponent } from '../../garbage-management-manager.component';

export class GarbageManagementManagerStatisticController {
  constructor(private that: GarbageManagementManagerComponent) {}

  private get panel() {
    return this.that.panel;
  }

  station = {
    open: (type: StationType) => {
      this.panel.station.open(type);
    },
  };
  device = {
    open: () => {
      this.panel.street.clear();
      this.panel.street.show = true;
    },
  };
}
