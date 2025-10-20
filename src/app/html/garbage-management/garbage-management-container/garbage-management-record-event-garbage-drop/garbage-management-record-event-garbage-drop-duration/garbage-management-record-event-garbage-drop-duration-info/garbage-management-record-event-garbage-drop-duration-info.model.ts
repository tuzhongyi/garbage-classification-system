export interface GarbageDropDurationInfoValue {
  value: number;
  unit: string;
}
export class GarbageDropDurationInfo {
  title = '';
  contents: GarbageDropDurationInfoValue[] = [];
}
export interface GarbageManagementRecordEventGarbageDropDurationInfoArgs {
  stationId: string;
  date: Date;
}
