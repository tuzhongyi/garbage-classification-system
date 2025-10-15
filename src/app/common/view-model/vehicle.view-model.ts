import { Injectable } from '@angular/core';
import { Vehicle } from '../network/model/garbage-station/vehicle/vehicle.model';
import {
  DivisionViewModel,
  DivisionViewModelConverter,
} from './division.view-model';

export class VehicleViewModel extends Vehicle {
  images: string[] = [];
  Division!: Promise<DivisionViewModel>;
}
@Injectable({
  providedIn: 'root',
})
export class VehicleViewModelConverter {
  constructor(division: DivisionViewModelConverter) {
    this.converter = { division };
  }

  private converter: {
    division: DivisionViewModelConverter;
  };

  convert(data: Vehicle): VehicleViewModel {
    let vm = new VehicleViewModel();
    vm = Object.assign(vm, data);
    vm.images = [];
    if (data.VehicleImageUrl) {
      vm.images.push(data.VehicleImageUrl);
    }
    if (data.PlateImageUrl) {
      vm.images.push(data.PlateImageUrl);
    }
    vm.Division = this.converter.division.get(data.DivisionId);
    return vm;
  }
}
