import { formatDate } from '@angular/common';
import { IllegalDropEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { GarbageStationGarbageCountStatistic } from '../../../../../../common/network/model/garbage-station/garbage-station-sarbage-count-statistic.model';
import { TimeRange } from '../../../../../../common/network/model/time-range.model';
import { ITimeData } from '../../../../garbage-management-chart/garbage-management-chart-line/garbage-management-chart-line.model';
import { GarbageDropDurationPanelModel } from '../garbage-drop-duration-panel/garbage-drop-duration-panel.model';

export interface LineZoomChartInputArgs {
  stationId: string;
  date: Date;
}

export interface ImageTimeData<T> extends ITimeData<T> {
  image: string;
  time: Date;
}

export interface LineZoomChartArgs {
  statistic?: GarbageStationGarbageCountStatistic;
  date: Date;
}

export type LineZoomChartSource = {
  count?: GarbageStationGarbageCountStatistic[];
  record?: IllegalDropEventRecord[];
};

export class LineZoomChartModel {
  count: ITimeData<GarbageStationGarbageCountStatistic>[] = [];
  record: ImageTimeData<IllegalDropEventRecord>[] = [];
  timeRange?: TimeRange;
}

export class LineZoomLinePanel {
  model = new GarbageDropDurationPanelModel();
  display = false;
  position = { x: '0px', y: '0px' };
}

export class LineZoomScatterPanel<T> {
  src = '';
  display = false;
  position = { x: '0px', y: '0px' };
  data?: T;
}

export class TimeString extends Date {
  constructor(date: Date | number, format?: string) {
    super(date);
    if (format) {
      this.formater = format;
    }
    if (typeof date === 'number') {
      this.date = new Date(date);
    } else {
      this.date = date;
    }
  }

  formater = 'H:mm:ss';

  date: Date;
  override toString() {
    return formatDate(this.date, this.formater, 'en');
  }
}

export enum SerieIndex {
  normal,
  offline,
  target,
  record,
}
