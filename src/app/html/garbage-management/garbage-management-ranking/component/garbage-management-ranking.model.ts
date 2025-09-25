import { EventType } from '../../../../common/enum/event-type.enum';
import { IIdNameModel } from '../../../../common/network/model/model.interface';

export interface IGarbageManagementRankingData<T extends IIdNameModel = any> {
  name: string;
  value: number;
  language: string;
  unit: string;
  data: T;
}

export interface IGarbageManagementRankingConverter<
  T extends IIdNameModel = any
> {
  convert(source: T, type?: EventType): IGarbageManagementRankingData<T>;
}
