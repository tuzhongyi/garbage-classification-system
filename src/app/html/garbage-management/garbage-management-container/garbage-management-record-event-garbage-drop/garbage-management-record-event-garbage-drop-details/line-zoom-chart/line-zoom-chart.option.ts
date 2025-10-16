export let option = {
  backgroundColor: 'transparent',
  animation: false,
  tooltip: {
    trigger: 'axis',
    formatter: '{b}',
    axisPointer: {
      lineStyle: {
        color: '#5e6ebf',
        width: 1.2,
      },
    },
  },
  grid: [
    {
      top: 20,
      left: '40px',
      right: '60px',
      height: '80%',
    },
    {
      left: '40px',
      right: '60px',
      bottom: '5%',
      height: '10%',
    },
  ],
  xAxis: {
    type: 'category',
    boundaryGap: false,
    minInterval: 1 * 1000 * 60,
    data: [],
    axisLine: { onZero: true },
    axisLabel: {
      color: '#CFD7FE',
      fontSize: '16',
      margin: -5,
      formatter: function (value: any, index: number) {
        return value;
      },
    },
  },
  yAxis: {
    show: false,
    type: 'value',
    boundaryGap: [0, '100%'],
    max: 1.1,
    min: -0.1,
  },
  dataZoom: [
    {
      type: 'inside',
      xAxisIndex: [0, 1],
      start: 0,
      end: 100,
    },
    {
      show: true,
      xAxisIndex: [0, 1],
      type: 'slider',
      start: 0,
      end: 100,
      fillerColor: 'rgb(117,134,224,0.5)',
      borderColor: '#5e6ebf',
      textStyle: {
        color: '#CFD7FE',
        fontSize: '16',
      },
    },
  ],
  series: [
    {
      type: 'line',
      connectNulls: false,
      smooth: false,
      step: 'end',
      symbol: 'emptyCircle',
      symbolSize: 8,
      color: '#28ce38',
      zlevel: 3,
      data: [],
    },

    {
      type: 'line',
      connectNulls: false,
      smooth: false,
      step: 'end',
      symbol: 'emptyCircle',
      symbolSize: 8,
      color: '#cccccc',
      data: [],
      zlevel: 2,
    },

    {
      type: 'line',
      connectNulls: false,
      smooth: false,
      step: 'end',
      symbol: 'emptyCircle',
      symbolSize: 8,
      color: '#CD661D',
      zlevel: 0,
      data: [],
    },
    {
      symbolSize: 15,
      data: [],
      type: 'scatter',
      symbol: 'image://assets/image/chart/arrow-tag.png',
      symbolKeepAspect: true,
      select: {},
      symbolOffset: [0, 25],
    },
  ],
};
