export class GarbageManagementChartStationCountItem {
  name: string = '';
  data: IData = {
    count: 0,
    value: 0,
  };
  color = new Color();
}

export class Color {
  r = 0;
  g = 0;
  b = 0;
}

interface IData {
  count: number;
  value: number;
}
