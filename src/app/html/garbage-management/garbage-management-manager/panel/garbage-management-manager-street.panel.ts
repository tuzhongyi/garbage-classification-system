import { EventEmitter } from '@angular/core';
import { WindowViewModel } from '../../../../common/components/window/window.model';
import { IasDevice } from '../../../../common/network/model/ias/ias-device.model';

export class GarbageManagementManagerStreetPanel extends WindowViewModel {
  event = {
    move: new EventEmitter<[number, number]>(),
    select: new EventEmitter<IasDevice>(),
  };
  style = {
    height: 'calc(100% - 85px)',
    width: '100%',
    transform: 'translate(0,0)',
    top: '85px',
    zIndex: '1',
  };
  title = '巡逻车辆';
  online?: boolean = undefined;
  clear() {
    this.online = undefined;
  }
  on = {
    position: (data: IasDevice) => {
      this.show = false;
      // if (data.Location) {
      //   let position: [number, number] = [
      //     data.Location.Longitude,
      //     data.Location.Latitude,
      //   ];
      //   this.event.move.emit(position);
      // }
      this.event.select.emit(data);
    },
  };
}
