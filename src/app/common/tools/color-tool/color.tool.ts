import { ColorChartTool } from './color-chart.tool';

export class ColorTool {
  static chart = new ColorChartTool();

  static gray = '';

  static station = {
    state: {
      error: '#aaaaaa',
      mixedinto: '#00f6ff',
      garbagefull: '#ff00f0',
      illegaldrop: '#ff8c00',
      garbagedrop: '#ffff00',
      illegalvehicle: '#f73d3d',
      garbageexposed: '#00b3ff',
      normal: '#01fd74',
    },
  };

  static compare = {
    larger: '#f73d3d',
    less: '#01fd74',
  };
}
