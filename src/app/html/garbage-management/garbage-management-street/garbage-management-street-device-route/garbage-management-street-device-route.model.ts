import { TimeUnit } from '../../../../common/enum/time-unit.enum';

export class GarbageManagementStreetDeviceRouteArgs {
  date = new Date();
  unit = TimeUnit.Day;
  deviceId!: string;
}
export enum GarbageManagementStreetDeviceRouteType {
  Meter,
  Speed,
  Time,
}
