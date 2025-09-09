import { Injectable } from '@angular/core';
import { GarbageStation } from '../../../../../common/network/model/garbage-station/garbage-station.model';
import { IasDevice } from '../../../../../common/network/model/ias/ias-device.model';
import { GarbageManagementManagerDataFilterController } from '../../../garbage-management-manager/controller/data/garbage-management-manager-data-filter.controller';
import {
  GarbageManagementStatisticRecordIcon,
  GarbageManagementStatisticStationItem,
} from '../garbage-management-statistic-station-item/garbage-management-statistic-station-item.model';

@Injectable()
export class GarbageManagementStatisticStationBusiness {
  constructor() {}

  private filter = new GarbageManagementManagerDataFilterController();

  stations(datas: GarbageStation[]) {
    let illegaldrop = this.filter.illegaldrop(datas);
    let illegalvehicle = this.filter.illegalvehicle(datas);
    let mixedinto = this.filter.mixedinto(datas);
    return [
      this.convert(
        mixedinto,
        GarbageManagementStatisticRecordIcon.mixedinto,
        '混合满溢投放点'
      ),
      this.convert(
        illegaldrop,
        GarbageManagementStatisticRecordIcon.illegaldrop,
        '垃圾偷倒投放点'
      ),
      this.convert(
        illegalvehicle,
        GarbageManagementStatisticRecordIcon.illegalvehicle,
        '建筑垃圾投放点'
      ),
    ];
  }
  devices(datas: IasDevice[]) {
    return this.convert(
      datas,
      GarbageManagementStatisticRecordIcon.street,
      '巡检车辆'
    );
  }

  private convert<T>(
    datas: T[],
    icon: GarbageManagementStatisticRecordIcon,
    name: string
  ) {
    let item = new GarbageManagementStatisticStationItem();
    item.icon = icon;
    item.name = name;
    item.value = datas.length;
    return item;
  }
}
