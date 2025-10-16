import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Vehicle } from '../../../model/garbage-station/vehicle/vehicle.model';
import { PagedList } from '../../../model/page_list.model';
import { VehicleUrl } from '../../../url/garbage/vehicle.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { Cache } from '../../cache/cache';
import { AbstractService } from '../../cache/cache.interface';
import { HowellAuthHttpService } from '../../howell-auth-http.service';
import { GetVehiclesParams } from './vehicle-request.params';

@Cache(VehicleUrl.basic(), Vehicle)
@Injectable({
  providedIn: 'root',
})
export class VehicleRequestService extends AbstractService<Vehicle> {
  private basic: HowellBaseRequestService;
  private type: HowellBaseTypeRequestService<Vehicle>;

  constructor(http: HowellAuthHttpService, router: Router) {
    super();
    this.basic = new HowellBaseRequestService(http, router);
    this.type = this.basic.type(Vehicle);
  }

  create(data: Vehicle): Promise<Vehicle> {
    let url = VehicleUrl.basic();
    return this.type.post(url, data);
  }
  get(vehicleId: string): Promise<Vehicle> {
    let url = VehicleUrl.item(vehicleId);
    return this.type.get(url);
  }
  update(data: Vehicle): Promise<Vehicle> {
    let url = VehicleUrl.item(data.Id);
    return this.type.put(url, data);
  }
  delete(vehicleId: string): Promise<Vehicle> {
    let url = VehicleUrl.item(vehicleId);
    return this.type.delete(url);
  }
  paged(
    params: GetVehiclesParams = new GetVehiclesParams()
  ): Promise<PagedList<Vehicle>> {
    let url = VehicleUrl.list();
    return this.type.paged(url, params);
  }
}
