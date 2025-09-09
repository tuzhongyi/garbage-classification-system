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
  @Output() mixedinto = new EventEmitter();

  selected = GarbageManagementControlButtonIcon.home;

  buttons = [
    { icon: GarbageManagementControlButtonIcon.home, name: '综合统计' },
    { icon: GarbageManagementControlButtonIcon.mixedinto, name: '混投满溢' },
    { icon: GarbageManagementControlButtonIcon.garbagedrop, name: '垃圾偷倒' },
    { icon: GarbageManagementControlButtonIcon.vehicle, name: '建筑垃圾清运' },
    { icon: GarbageManagementControlButtonIcon.street, name: '街面巡检' },
    { icon: GarbageManagementControlButtonIcon.filter, name: '筛选' },
  ];

  on = {
    change: (index: GarbageManagementControlButtonIcon) => {
      if (this.selected === index) return;
      switch (index) {
        case GarbageManagementControlButtonIcon.home:
          this.selected = index;
          this.home.emit();
          break;
        case GarbageManagementControlButtonIcon.mixedinto:
          this.selected = index;
          this.mixedinto.emit();
          break;
        case GarbageManagementControlButtonIcon.garbagedrop:
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
