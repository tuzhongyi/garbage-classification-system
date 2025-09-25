import { Injectable } from '@angular/core';
import { IasDevice } from '../../../../../../common/network/model/ias/ias-device.model';
import { IIdNameModel } from '../../../../../../common/network/model/model.interface';
import { IasRequestService } from '../../../../../../common/network/request/ias/ias-request.service';
import { GarbageManagementRecordEventIasStatisticRouteType } from '../garbage-management-record-event-ias-statistic-route.model';

@Injectable()
export class GarbageManagementRecordEventIasStatisticRouteManagerSource {
  devices: IasDevice[] = [];
  types: IIdNameModel<number>[] = [];
  constructor(private service: IasRequestService) {
    this.init.device();
    this.init.type();
  }

  private init = {
    device: () => {
      this.service.device.all().then((x) => {
        this.devices = x;
      });
    },
    type: () => {
      this.types = [
        {
          Id: GarbageManagementRecordEventIasStatisticRouteType.Meter,
          Name: '里程',
        },
        {
          Id: GarbageManagementRecordEventIasStatisticRouteType.Speed,
          Name: '速度',
        },
        {
          Id: GarbageManagementRecordEventIasStatisticRouteType.Time,
          Name: '时长',
        },
      ];
    },
  };
}
