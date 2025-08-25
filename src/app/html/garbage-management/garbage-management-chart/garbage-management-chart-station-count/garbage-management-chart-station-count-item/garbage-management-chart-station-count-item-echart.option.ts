export const GarbageManagementChartStationCountItemEChartOption: any = {
  backgroundColor: 'transparent',
  series: [
    {
      type: 'gauge',
      min: 0,
      max: 100,
      z: 1,
      startAngle: 225,
      endAngle: -45,
      radius: '100%',
      center: ['50%', '50%'],
      silent: true,
      progress: {
        show: true,
        roundCap: true,
        z: 1,
        width: 4,
        itemStyle: {
          color: {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 1, color: 'rgba(174, 150, 166, 0.2)' },
              { offset: 0, color: '#FF4500' },
            ],
          },
        },
      },
      axisLine: {
        lineStyle: {
          width: 4,
          color: [[1, 'rgba(174, 150, 166, 0.2)']],
        },
      },
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      anchor: {
        show: true,
        size: 80,
        itemStyle: {
          color: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.9,
            colorStops: [
              {
                offset: 1,
                color: '#fff', // 渐变结束颜色
              },
              {
                offset: 0,
                color: 'rgba(0,0,0,0)', // 渐变开始颜色,
              },
            ],
          },
          borderColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#00f6ff', // 渐变开始颜色,
              },
              {
                offset: 1,
                color: '#286cf1', // 渐变结束颜色
              },
            ],
          },
          borderWidth: 2,
        },
      },

      pointer: {
        show: false,
        length: 6,
        icon: 'circle',
        showAbove: true,
        offsetCenter: [0, '-92%'],
        itemStyle: {
          color: '#ffffff',
          shadowColor: '#ffffff',
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
        },
      },
      detail: {
        valueAnimation: true,

        offsetCenter: [0, 0],
        rich: {
          value: {
            fontFamily: 'howell light',
            color: '#FF4500',
            fontSize: 24,
          },
          unit: {
            fontFamily: 'howell light',
            color: '#FF4500',
            fontSize: 18,
            padding: [0, 0, -8, 0],
          },
        },
        formatter: (value: number) => {
          return `{value|${value.toFixed(0)}}{unit|%}`;
        },
      },
      data: [{ value: 100 }],
    },
    {
      type: 'gauge',
      z: 2,
      min: 0,
      max: 100,
      startAngle: 225,
      endAngle: -45,
      radius: '100%',
      center: ['50%', '50%'],

      silent: true,
      progress: {
        show: false,
      },
      pointer: {
        show: true,
        length: 6,
        icon: 'circle',
        showAbove: true,
        offsetCenter: [0, '-92%'],
        itemStyle: {
          color: 'rgba(255,255,255,0.8)',
          shadowColor: '#ffffff',
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      anchor: {
        show: false,
      },
      title: {
        show: false,
      },
      detail: {
        show: false,
      },
      data: [{ value: 100 }],
    },
    {
      type: 'gauge',
      z: 0,
      min: 0,
      max: 100,
      startAngle: 225,
      endAngle: -45,
      radius: '100%',
      center: ['50%', '50%'],

      silent: true,
      itemStyle: {
        color: {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 1, color: 'rgba(0, 0, 0, 0.2)' },
            { offset: 0, color: '#FF4500' },
          ],
        },
      },
      progress: {
        show: true,
        width: 10000,
      },
      pointer: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      anchor: {
        show: false,
      },
      title: {
        show: false,
      },
      detail: {
        show: false,
      },
      data: [{ value: 100 }],
    },
  ],
};
