export enum GarbageManagementRecordEventIllegalDumpIndex {
  list,
  total,
  details,
}

export interface GarbageManagementRecordEventIllegalDumpArgs {
  stationId?: string;
  divisionId?: string;
}
