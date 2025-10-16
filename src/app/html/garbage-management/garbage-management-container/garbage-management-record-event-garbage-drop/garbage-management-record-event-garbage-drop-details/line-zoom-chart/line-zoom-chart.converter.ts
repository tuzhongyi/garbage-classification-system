import { IllegalDropEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { GarbageStationGarbageCountStatistic } from '../../../../../../common/network/model/garbage-station/garbage-station-sarbage-count-statistic.model';
import { ITimeData } from '../../../../garbage-management-chart/garbage-management-chart-line/garbage-management-chart-line.model';
import {
  ImageTimeData,
  LineZoomChartModel,
  LineZoomChartSource,
} from './line-zoom-chart.model';

export class LineZoomChartConverter {
  private converter = {
    count: new LineZoomChartDropDurationConverter(),
    record: new LineZoomChartEventRecordConverter(),
  };

  Convert(source: LineZoomChartSource, ...res: any[]): LineZoomChartModel {
    let model = new LineZoomChartModel();
    if (source.count) {
      model.count = this.converter.count.Convert(source.count);
    }
    if (source.record) {
      model.record = this.converter.record.Convert(source.record);
    }
    return model;
  }
}

export class LineZoomChartEventRecordConverter {
  Convert(
    source: IllegalDropEventRecord[],
    ...res: any[]
  ): ImageTimeData<IllegalDropEventRecord>[] {
    let datas: ImageTimeData<IllegalDropEventRecord>[] = [];
    for (let i = 0; i < source.length; i++) {
      const record = source[i];
      try {
        let time = new Date(record.EventTime);
        time.setMilliseconds(0);
        time.setSeconds(0);
        datas.push({
          time: time,
          value: record,
          image: record.ImageUrl ?? '',
        });
      } catch (error) {
        console.error(error, this, record);
      }
    }
    return datas;
  }
}

export class LineZoomChartDropDurationConverter {
  Convert(
    source: GarbageStationGarbageCountStatistic[],
    ...res: any[]
  ): ITimeData<GarbageStationGarbageCountStatistic>[] {
    let datas: ITimeData<GarbageStationGarbageCountStatistic>[] = [];
    for (let i = 0; i < source.length; i++) {
      const item = source[i];
      try {
        datas.push({
          time: item.BeginTime,
          value: item,
        });
      } catch (error) {
        console.error(error, this, item);
      }
    }
    return datas;
  }
}
