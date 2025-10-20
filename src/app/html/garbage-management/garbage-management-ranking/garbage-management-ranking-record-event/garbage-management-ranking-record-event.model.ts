import { EventType } from '../../../../common/enum/event-type.enum';

export enum GarbageManagementRankingRecordEventIndex {
  garbagedropduration,
  garbagedropcount,

  illegaldrop,
  mixedinto,
  garbagefull,
  illegaldump,
  illegalvehicle,
}
export interface GarbageManagementRankingRecordEventArgs {
  type: EventType;
  divisionId?: string;
  stationId?: string;
}
