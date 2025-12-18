import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'howell-garbage-management-street-device-route-map-settings',
  imports: [CommonModule, FormsModule],
  templateUrl:
    './garbage-management-street-device-route-map-settings.component.html',
  styleUrl:
    './garbage-management-street-device-route-map-settings.component.less',
})
export class GarbageManagementStreetDeviceRouteMapSettingsComponent {
  @Input() rectified: boolean = false;
  @Output() rectifiedChange = new EventEmitter<boolean>();

  @Input() top = true;
  @Input() left = false;

  on = {
    rectified: () => {
      this.rectifiedChange.emit(this.rectified);
    },
  };
}
