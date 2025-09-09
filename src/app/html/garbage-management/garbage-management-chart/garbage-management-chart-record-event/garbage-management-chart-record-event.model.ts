export interface IGarbageManagementChartRecordEventData {
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
