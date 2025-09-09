import { Injectable } from '@angular/core';
import { EventType } from '../../../../common/enum/event-type.enum';
import { StationState } from '../../../../common/enum/station-state.enum';
import { Flags } from '../../../../common/tools/flags';
import { GarbageStationViewModel } from '../../../../common/view-model/garbage-station.view-model';
import { GarbageManagementManagerDataFilterController } from '../../garbage-management-manager/controller/data/garbage-management-manager-data-filter.controller';
import { GarbageManagementManagerIndex } from '../../garbage-management-manager/garbage-management-manager.model';
import {
  GarbageManagementStateItem,
  GarbageManagementStateItemColor,
} from '../garbage-management-state-item/garbage-management-state-item.model';

@Injectable()
export class GarbageManagementStateStationBusiness {
  private _filter = new GarbageManagementManagerDataFilterController();
  filter(
    index: GarbageManagementManagerIndex,
    datas: GarbageStationViewModel[]
  ) {
    switch (index) {
      case GarbageManagementManagerIndex.home:
        return datas;
      case GarbageManagementManagerIndex.mixedinto:
        return this._filter.mixedinto(datas);
      case GarbageManagementManagerIndex.garbagedrop:
        return this._filter.illegaldrop(datas);
      case GarbageManagementManagerIndex.vehicle:
        return this._filter.illegalvehicle(datas);
      default:
        return [];
    }
  }
  load(datas: GarbageStationViewModel[], eventables: EventType[]) {
    let normal = this.create(
      '正常',
      StationState.Normal,
      GarbageManagementStateItemColor.green
    );
    let full = this.create(
      '满溢',
      StationState.Full,
      GarbageManagementStateItemColor.purple
    );
    let drop = this.create(
      '滞留',
      StationState.PanicButton,
      GarbageManagementStateItemColor.yellow
    );
    let error = this.create(
      '异常',
      StationState.Error,
      GarbageManagementStateItemColor.gray
    );

    datas.forEach((station) => {
      let flags = new Flags(station.StationState);
      if (flags.contains(StationState.Error)) {
        error.value++;
      } else {
        let can = true;
        if (eventables.includes(EventType.GarbageFull)) {
          if (flags.contains(StationState.Full)) {
            full.value++;
            can = false;
          }
        }
        if (eventables.includes(EventType.GarbageDrop)) {
          if (station.Statistic && station.Statistic.CurrentGarbageTime) {
            drop.value++;
            can = false;
          }
        }
        if (can) {
          normal.value++;
        }
      }
    });

    let states = [normal, full, drop, error];
    return states;
  }

  private create(
    name: string,
    state: StationState,
    color: GarbageManagementStateItemColor
  ) {
    let item = new GarbageManagementStateItem();
    item.color = color;
    item.name = name;
    item.state = state;
    return item;
  }
}
