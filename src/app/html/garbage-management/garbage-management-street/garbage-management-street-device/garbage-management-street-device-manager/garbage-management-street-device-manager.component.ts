import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HowellSelectComponent } from '../../../../../common/components/select/hw-select/select-control.component';
import { IasDevice } from '../../../../../common/network/model/ias/ias-device.model';
import { SelectDivisionComponent } from '../../../../share/select/select-division/select-division.component';
import { GarbageManagementStreetDeviceTableArgs } from '../garbage-management-street-device-table/business/garbage-management-street-device-table.model';
import { GarbageManagementStreetDeviceTableComponent } from '../garbage-management-street-device-table/garbage-management-street-device-table.component';

@Component({
  selector: 'howell-garbage-management-street-device-manager',
  imports: [
    CommonModule,
    FormsModule,
    SelectDivisionComponent,
    HowellSelectComponent,
    GarbageManagementStreetDeviceTableComponent,
  ],
  templateUrl: './garbage-management-street-device-manager.component.html',
  styleUrl: './garbage-management-street-device-manager.component.less',
})
export class GarbageManagementStreetDeviceManagerComponent {
  table = {
    args: new GarbageManagementStreetDeviceTableArgs(),
    load: new EventEmitter<GarbageManagementStreetDeviceTableArgs>(),
  };

  on = {
    position: (data: IasDevice) => {},
    search: () => {
      this.table.load.emit(this.table.args);
    },
  };
}
