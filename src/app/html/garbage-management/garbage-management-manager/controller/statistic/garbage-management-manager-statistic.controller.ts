import { Injectable } from '@angular/core';
import { StationType } from '../../../../../common/enum/station-type.enum';
import { GarbageManagementManagerPanel } from '../../panel/garbage-management-manager.panel';

@Injectable()
export class GarbageManagementManagerStatisticController {
  constructor(private panel: GarbageManagementManagerPanel) {}

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
