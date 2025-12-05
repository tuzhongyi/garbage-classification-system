import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IasDevice } from '../../../../common/network/model/ias/ias-device.model';
import { GarbageManagementStreetDeviceRouteManagerComponent } from '../garbage-management-street-device-route/garbage-management-street-device-route-manager/garbage-management-street-device-route-manager.component';
import { GarbageManagementStreetDeviceManagerComponent } from '../garbage-management-street-device/garbage-management-street-device-manager/garbage-management-street-device-manager.component';
import {
  GarbageManagementStreetArgs,
  GarbageManagementStreetIndex,
} from '../garbage-management-street.model';

@Component({
  selector: 'howell-garbage-management-street-manager',
  imports: [
    CommonModule,
    GarbageManagementStreetDeviceManagerComponent,
    GarbageManagementStreetDeviceRouteManagerComponent,
  ],
  templateUrl: './garbage-management-street-manager.component.html',
  styleUrl: './garbage-management-street-manager.component.less',
})
export class GarbageManagementStreetManagerComponent {
  @Input() args: GarbageManagementStreetArgs = {};
  @Input() index = GarbageManagementStreetIndex.list;
  @Output() position = new EventEmitter<IasDevice>();

  Index = GarbageManagementStreetIndex;

  on = {
    index: (index: GarbageManagementStreetIndex) => {
      this.index = index;
    },
    position: (data: IasDevice) => {
      this.position.emit(data);
    },
  };
}
