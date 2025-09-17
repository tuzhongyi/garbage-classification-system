import { GisPoint } from '../../../network/model/garbage-station/gis-point.model';

export class GisPointTool {
  valid(data?: GisPoint) {
    if (data) {
      return data.Longitude && data.Latitude;
    }
    return false;
  }

  to(data?: GisPoint) {
    if (this.valid(data)) {
      return [data!.Longitude!, data!.Latitude!] as [number, number];
    }
    return undefined;
  }
}
