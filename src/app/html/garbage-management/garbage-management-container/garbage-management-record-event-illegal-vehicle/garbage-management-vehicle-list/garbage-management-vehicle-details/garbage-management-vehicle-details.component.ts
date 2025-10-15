import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PictureComponent } from '../../../../../../common/components/picture/component/picture.component';
import { HowellSelectComponent } from '../../../../../../common/components/select/hw-select/select-control.component';
import { TextSpaceBetweenDirective } from '../../../../../../common/directives/text-space-between/text-space-between.directive';
import { Vehicle } from '../../../../../../common/network/model/garbage-station/vehicle/vehicle.model';
import { Language } from '../../../../../../common/tools/language';
import { GarbageManagementVehicleDetailsSource } from './garbage-management-vehicle-details.source';

@Component({
  selector: 'howell-garbage-management-vehicle-details',
  imports: [
    CommonModule,
    FormsModule,
    HowellSelectComponent,
    TextSpaceBetweenDirective,
    PictureComponent,
  ],
  templateUrl: './garbage-management-vehicle-details.component.html',
  styleUrl: './garbage-management-vehicle-details.component.less',
})
export class GarbageManagementVehicleDetailsComponent implements OnInit {
  @Input() data?: Vehicle;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Vehicle>();

  source = new GarbageManagementVehicleDetailsSource();

  model = new Vehicle();
  Language = Language;

  ngOnInit(): void {
    if (this.data) {
      this.model = Object.assign(this.model, this.data);
    }
  }

  on = {
    type: (type: number) => {
      this.model.VehicleType = type;
    },
    button: {
      close: () => {
        this.close.emit();
      },
      save: () => {
        this.save.emit(this.model);
      },
    },
  };
}
