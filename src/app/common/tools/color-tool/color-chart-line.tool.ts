import * as echarts from 'echarts';
export class ColorChartLineTool {
  get(r: number, g: number, b: number) {
    return {
      area: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: `rgba(${r}, ${g}, ${b}, 0.7)`,
        },
        {
          offset: 1,
          color: `rgba(${r}, ${g}, ${b}, 0)`,
        },
      ]),
      line: `rgba(${r}, ${g}, ${b}, 1)`,
      point: {
        border: `rgba(${r}, ${g}, ${b}, 1)`,
        background: '#18164f',
      },
    };
  }
}
