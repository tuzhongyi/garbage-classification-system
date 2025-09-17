import { IIdNameModel } from '../../../../common/network/model/model.interface';

export interface ITimeData<T> {
  time: Date;
  value: T;
  index?: number;
}

export interface IGarbageManagementChartRecordEventSource {
  time: Date;
  value?: number;
}
export interface IGarbageManagementChartRecordEventColor {
  area: string | echarts.graphic.LinearGradient;
  line: string | echarts.graphic.LinearGradient;
  point: {
    border: string;
    background: string;
  };
}

export interface IGarbageManagementChartRecordEventData<
  TValue = number,
  TId = string
> extends IIdNameModel<TId> {
  color?: IGarbageManagementChartRecordEventColor;
  datas: ITimeData<TValue>[];
}
