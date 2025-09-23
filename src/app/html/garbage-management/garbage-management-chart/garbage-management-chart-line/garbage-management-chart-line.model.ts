import { IIdNameModel } from '../../../../common/network/model/model.interface';

export interface ITimeData<T> {
  time: Date;
  value: T;
  index?: number;
}

export interface IGarbageManagementChartSource {
  time: Date;
  value?: number;
}
export interface IGarbageManagementChartColor {
  area: string | echarts.graphic.LinearGradient;
  line: string | echarts.graphic.LinearGradient;
  point: {
    border: string;
    background: string;
  };
}

export interface IGarbageManagementChartData<TValue = number, TId = string>
  extends IIdNameModel<TId> {
  color?: IGarbageManagementChartColor;
  unit?: string;
  datas: ITimeData<TValue>[];
  format?: (value: TValue) => string;
}
