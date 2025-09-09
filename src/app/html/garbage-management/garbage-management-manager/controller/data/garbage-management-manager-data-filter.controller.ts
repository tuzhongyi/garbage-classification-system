import { CameraUsage } from '../../../../../common/enum/camera-usage.enum';
import { StationType } from '../../../../../common/enum/station-type.enum';
import { GarbageStation } from '../../../../../common/network/model/garbage-station/garbage-station.model';
import { Flags } from '../../../../../common/tools/flags';

export class GarbageManagementManagerDataFilterController {
  illegaldrop<T extends GarbageStation>(datas: T[]) {
    return datas.filter((x) => {
      return (
        x.StationType != StationType.Construction &&
        x.StationType != StationType.VehicleWatching
      );
    });
  }
  illegalvehicle<T extends GarbageStation>(datas: T[]) {
    return datas.filter((x) => {
      return (
        x.StationType == StationType.Construction ||
        x.StationType == StationType.VehicleWatching
      );
    });
  }
  mixedinto<T extends GarbageStation>(datas: T[]) {
    return datas.filter((x) => {
      if (x.Cameras) {
        for (let i = 0; i < x.Cameras.length; i++) {
          const camera = x.Cameras[i];
          let flags = new Flags(camera.CameraUsage);
          if (
            flags.contains(CameraUsage.GarbageFull) &&
            x.StationType != StationType.Construction
          ) {
            return true;
          }
          if (flags.contains(CameraUsage.MixedInto)) {
            return true;
          }
        }
        return false;
      }
      return false;
    });
  }
}
