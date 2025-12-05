import { Injectable } from '@angular/core';
import { IasDevice } from '../../../../../common/network/model/ias/ias-device.model';
import { IIdNameModel } from '../../../../../common/network/model/model.interface';
import { IasRequestService } from '../../../../../common/network/request/ias/ias-request.service';
import { GarbageManagementStreetDeviceRouteType } from '../garbage-management-street-device-route.model';

@Injectable()
export class GarbageManagementStreetDeviceRouteManagerSource {
  devices: IasDevice[] = [];
  types: IIdNameModel<number>[] = [];
  constructor(private service: IasRequestService) {
    this.init.device();
    this.init.type();
  }

  private init = {
    device: () => {
      this.service.device.array().then((x) => {
        this.devices = x;
      });
    },
    type: () => {
      this.types = [
        {
          Id: GarbageManagementStreetDeviceRouteType.Meter,
          Name: '里程',
        },
        {
          Id: GarbageManagementStreetDeviceRouteType.Speed,
          Name: '速度',
        },
        {
          Id: GarbageManagementStreetDeviceRouteType.Time,
          Name: '时长',
        },
      ];
    },
  };
}
