import { OrderType } from '../../../../../../../common/enum/order-type.enum';
import { Division } from '../../../../../../../common/network/model/garbage-station/division.model';
import { GarbageStationNumberStatisticV2 } from '../../../../../../../common/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { GarbageStation } from '../../../../../../../common/network/model/garbage-station/garbage-station.model';

export class GarbageStationStatisticModel extends GarbageStationNumberStatisticV2 {
  [key: string]: any;

  GarbageRatioTd = new GarbageStationStatisticTd();

  AvgGarbageTimeTd = new GarbageStationStatisticTd();

  MaxGarbageTimeTd = new GarbageStationStatisticTd();

  GarbageDurationTd = new GarbageStationStatisticTd();

  IllegalDropTd = new GarbageStationStatisticTd();

  IllegalDrop = 0;
  MixedInto = 0;

  MixedIntoTd = new GarbageStationStatisticTd();

  GarbageStation!: Promise<GarbageStation>;
  Committees!: Promise<Division>;
  County!: Promise<Division>;
}

export class GarbageStationStatisticTd {
  value: number = 0;
  format: string = '0';
  differ: number = 0;
  differView: string = '';
}

export class GarbageStationStatisticTableSource {
  current?: GarbageStationNumberStatisticV2[];
  before?: GarbageStationNumberStatisticV2[];
}

export class OrderModel {
  constructor(name: string, type: OrderType) {
    this.type = type;
    this.name = name;
  }
  type: OrderType;
  name: string;
}
