import { StationType } from '../../../../../common/enum/station-type.enum';
import { GarbageStation } from '../../../../../common/network/model/garbage-station/garbage-station.model';

export class GarbageManagementManagerDataFilterController {
  illegaldrop<T extends GarbageStation>(datas: T[]) {
    return datas.filter((x) => {
      return x.StationType == StationType.IllegalDrop;
    });
  }
  illegalvehicle<T extends GarbageStation>(datas: T[]) {
    return datas.filter(
      (x) =>
        x.StationType == StationType.VehicleWatching ||
        x.StationType == StationType.Construction
    );
  }
  garbagestation<T extends GarbageStation>(datas: T[]) {
    return datas.filter((x) => {
      return (
        x.StationType == StationType.Garbage ||
        x.StationType == StationType.Smart ||
        x.StationType == StationType.Plus
      );
    });
  }
}
