import { TimeUnit } from '../../../../../common/enum/time-unit.enum';
import { Duration } from '../../../../../common/network/model/garbage-station/duration.model';
import { GarbageStationNumberStatisticV2 } from '../../../../../common/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { IIdNameModel } from '../../../../../common/network/model/model.interface';

export class GarbageManagementStationStatisticDetailsArgs {
  duration!: Duration;
  unit = TimeUnit.Week;
  stationIds: string[] = [];
  type = StatisticType.garde;
  date = new Date();
}
export enum StatisticType {
  // 达标率
  garde,
  // 平均落地时长
  avgGarbageTime,
  // 最大落地时长
  maxGarbageTime,
  // 有垃圾时长
  garbageDuration,
  // 乱丢垃圾
  illegalDrop,
  // 混合投放
  mixedInto,
}
export class GarbageStationNumberStatisticV2Group implements IIdNameModel {
  Name!: string;
  Id!: string;
  datas: GarbageStationNumberStatisticV2[] = [];
}
