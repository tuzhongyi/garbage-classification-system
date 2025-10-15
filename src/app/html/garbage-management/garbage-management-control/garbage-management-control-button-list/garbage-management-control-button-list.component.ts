import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { GarbageManagementControlButtonComponent } from '../garbage-management-control-button/garbage-management-control-button.component';
import { GarbageManagementControlButtonIcon } from '../garbage-management-control-button/garbage-management-control-button.model';

@Component({
  selector: 'howell-garbage-management-control-button-list',
  imports: [CommonModule, GarbageManagementControlButtonComponent],
  templateUrl: './garbage-management-control-button-list.component.html',
  styleUrl: './garbage-management-control-button-list.component.less',
})
export class GarbageManagementControlButtonListComponent {
  @Output() home = new EventEmitter();
  @Output() street = new EventEmitter();
  @Output() vehicle = new EventEmitter();
  @Output() filter = new EventEmitter();
  @Output() garbagedrop = new EventEmitter();
  @Output() station = new EventEmitter();

  selected = GarbageManagementControlButtonIcon.home;

  buttons = [
    { icon: GarbageManagementControlButtonIcon.home, name: '综合统计' },
    { icon: GarbageManagementControlButtonIcon.station, name: '垃圾箱房' },
    { icon: GarbageManagementControlButtonIcon.illegaldump, name: '垃圾偷倒' },
    { icon: GarbageManagementControlButtonIcon.vehicle, name: '非法清运' },
    { icon: GarbageManagementControlButtonIcon.street, name: '街面巡检' },
    // { icon: GarbageManagementControlButtonIcon.filter, name: '筛选' },
  ];

  on = {
    change: (index: GarbageManagementControlButtonIcon) => {
      if (this.selected === index) return;
      switch (index) {
        case GarbageManagementControlButtonIcon.home:
          this.selected = index;
          this.home.emit();
          break;
        case GarbageManagementControlButtonIcon.station:
          this.selected = index;
          this.station.emit();
          break;
        case GarbageManagementControlButtonIcon.illegaldump:
          this.selected = index;
          this.garbagedrop.emit();
          break;
        case GarbageManagementControlButtonIcon.vehicle:
          this.selected = index;
          this.vehicle.emit();
          break;
        case GarbageManagementControlButtonIcon.street:
          this.selected = index;
          this.street.emit();
          break;
        case GarbageManagementControlButtonIcon.filter:
          this.filter.emit();
          break;

        default:
          break;
      }
    },
  };
}
