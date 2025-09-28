import { ColorChartTool } from './color-chart.tool';

export class ColorTool {
  static chart = new ColorChartTool();

  static gray = '';

  static station = {
    state: {
      error: '#aaaaaa',
      mixedinto: '#ff00f0', //'#00f6ff',
      garbagefull: '#ffff00', //'#ff00f0',
      illegaldrop: '#00f6ff', //'#ff8c00',
      garbagedrop: '#ff8c00', // '#ffff00',
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
