import { EventType } from '../../../../common/enum/event-type.enum';

export interface IGarbageManagementRankingData {
  name: string;
  value: number;
  language: string;
  unit: string;
}

export interface IGarbageManagementRankingConverter<T = any> {
  convert(source: T, type?: EventType): IGarbageManagementRankingData;
}
