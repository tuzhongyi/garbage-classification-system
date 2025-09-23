import { Injectable } from '@angular/core';
import { EventType } from '../../../../../common/enum/event-type.enum';
import { GarbageManagementManagerPanel } from '../../panel/garbage-management-manager.panel';

@Injectable()
export class GarbageManagementManagerStatisticController {
  constructor(private panel: GarbageManagementManagerPanel) {}

  station = {
    open: (eventables: EventType[]) => {
      this.panel.station.show = true;
    },
  };
  device = {
    open: () => {
      this.panel.street.clear();
      this.panel.street.show = true;
    },
  };
}
