import { Injectable } from '@angular/core';
import { Vehicle } from '../../../../../../common/network/model/garbage-station/vehicle/vehicle.model';
import { VehicleRequestService } from '../../../../../../common/network/request/garbage/vehicle/vehicle-request.service';

@Injectable()
export class GarbageManagementVehicleListManagerBusiness {
  constructor(private service: VehicleRequestService) {}

  delete(id: string) {
    return this.service.delete(id);
  }
  update(data: Vehicle) {
    return this.service.update(data);
  }
}
