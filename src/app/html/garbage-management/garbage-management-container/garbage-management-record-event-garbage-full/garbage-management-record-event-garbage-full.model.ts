export enum GarbageManagementRecordEventGarbageFullIndex {
  list,
  total,
  details,
  station,
}
export interface GarbageManagementRecordEventGarbageFullArgs {
  stationId?: string;
  divisionId?: string;
}
