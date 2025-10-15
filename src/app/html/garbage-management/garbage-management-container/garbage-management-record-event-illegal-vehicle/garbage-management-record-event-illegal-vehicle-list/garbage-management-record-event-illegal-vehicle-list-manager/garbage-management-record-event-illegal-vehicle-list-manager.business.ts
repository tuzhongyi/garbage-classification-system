import { Injectable } from '@angular/core';
import { IllegalVehicleEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/illegal-vehicle-event-record.model';
import { Vehicle } from '../../../../../../common/network/model/garbage-station/vehicle/vehicle.model';
import { GarbageStationRequestService } from '../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { GetVehiclesParams } from '../../../../../../common/network/request/garbage/vehicle/vehicle-request.params';
import { VehicleRequestService } from '../../../../../../common/network/request/garbage/vehicle/vehicle-request.service';
import { Guid } from '../../../../../../common/tools/guid/guid';

@Injectable()
export class GarbageManagementRecordEventIllegalVehicleListManagerBusiness {
  constructor(
    station: GarbageStationRequestService,
    vehicle: VehicleRequestService
  ) {
    this.service = { station, vehicle };
  }

  private service: {
    station: GarbageStationRequestService;
    vehicle: VehicleRequestService;
  };

  async get(plate: string): Promise<Vehicle | undefined> {
    try {
      let params = new GetVehiclesParams();
      params.PlateNo = plate;
      params.PageIndex = 1;
      params.PageSize = 1;
      let paged = await this.service.vehicle.list(params);
      return paged.Data[0];
    } catch (error) {
      return undefined;
    }
  }

  async enable(data: IllegalVehicleEventRecord) {
    let vehicle = await this.get(data.Data.PlateNo);
    if (vehicle) {
      vehicle.VehicleType = 1;
      return this.service.vehicle.update(vehicle);
    }
    vehicle = this.create(data);
    return this.service.vehicle.create(vehicle);
  }

  private create(data: IllegalVehicleEventRecord) {
    let vehicle = new Vehicle();
    vehicle.Id = Guid.NewGuid().ToString('N').toLowerCase();
    vehicle.CreateTime = new Date();
    vehicle.UpdateTime = new Date();
    if (data.Data.DivisionId) {
      vehicle.DivisionId = data.Data.DivisionId;
    }
    vehicle.PlateColor = data.Data.PlateColor;
    vehicle.PlateImageUrl = data.Data.PlateImageUrl;
    vehicle.PlateNo = data.Data.PlateNo;
    vehicle.VehicleImageUrl = data.Data.VehicleImageUrl ?? data.ImageUrl;
    vehicle.VehicleType = 1;
    return vehicle;
  }
}
