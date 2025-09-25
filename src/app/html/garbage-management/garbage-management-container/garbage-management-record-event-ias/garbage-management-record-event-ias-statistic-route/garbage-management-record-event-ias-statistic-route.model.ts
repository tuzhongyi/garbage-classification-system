import { TimeUnit } from '../../../../../common/enum/time-unit.enum';

export class GarbageManagementRecordEventIasStatisticRouteArgs {
  date = new Date();
  unit = TimeUnit.Day;
  deviceId!: string;
}
export enum GarbageManagementRecordEventIasStatisticRouteType {
  Meter,
  Speed,
  Time,
}
