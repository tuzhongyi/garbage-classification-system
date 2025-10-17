import { CompareRange } from '../../../../../../common/network/model/garbage-station/compare-range.model';
import { IIdNameModel } from '../../../../../../common/network/model/model.interface';

export class GarbageManagementRecordEventGarbageDropListManagerSource {
  state: IIdNameModel<number>[];
  stay: IIdNameModel<CompareRange<number>>[];
  constructor() {
    this.state = this.init.state();
    this.stay = this.init.stay();
  }

  private init = {
    state: () => {
      return [
        { Id: 0, Name: '待处置' },
        { Id: 1, Name: '已处置' },
        { Id: 2, Name: '超时任务' },
        { Id: 3, Name: '超时待处置' },
        { Id: 4, Name: '超时已处置' },
      ];
    },
    stay: () => {
      let min30 = new CompareRange<number>();
      min30.LessThan = 30;
      min30.GreaterThan = 0;
      min30.IsEqual = true;

      let min60 = new CompareRange<number>();
      min60.IsEqual = true;
      min60.GreaterThan = 30;
      min60.LessThan = 60;

      let min120 = new CompareRange<number>();
      min120.IsEqual = true;
      min120.GreaterThan = 60;
      min120.LessThan = 120;

      let other = new CompareRange<number>();
      other.IsEqual = true;
      other.GreaterThan = 120;

      return [
        { Id: min30, Name: '30分钟以内' },
        { Id: min60, Name: '30分钟-1小时' },
        { Id: min120, Name: '1小时-2小时' },
        { Id: other, Name: '2小时以上' },
      ];
    },
  };
}
