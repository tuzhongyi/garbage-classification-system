import { Division } from '../../../../../common/network/model/garbage-station/division.model';
import { EventNumberStatistic } from '../../../../../common/network/model/garbage-station/event-number-statistic.model';
import { GridCell } from '../../../../../common/network/model/garbage-station/grid-cell.model';
import { IGarbageManagementRankingData } from '../../component/garbage-management-ranking.model';

export class GarbageManagementRankingRecordEventIasConverter {
  convert(source: Division | GridCell, datas: EventNumberStatistic[]) {
    let data: IGarbageManagementRankingData = {
      name: source.Name,
      language: '0',
      unit: '起',
      value: 0,
      data: source,
    };
    datas.forEach((day) => {
      let number = day.EventNumbers.find(
        (x) => (x.EventType as number) === 103
      );
      if (number) {
        data.value += number.DayNumber;
        data.language = data.value.toString();
      }
    });
    return data;
  }
}
