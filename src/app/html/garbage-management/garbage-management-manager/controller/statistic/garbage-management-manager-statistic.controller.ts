import { Injectable } from '@angular/core';
import { EventType } from '../../../../../common/enum/event-type.enum';
import { GarbageManagementManagerWindow } from '../../window/garbage-management-manager.window';

@Injectable()
export class GarbageManagementManagerStatisticController {
  constructor(private window: GarbageManagementManagerWindow) {}

  station = {
    open: (eventables: EventType[]) => {
      this.window.station.show = true;
    },
  };
  device = {
    open: () => {
      this.window.street.show = true;
    },
  };
}
