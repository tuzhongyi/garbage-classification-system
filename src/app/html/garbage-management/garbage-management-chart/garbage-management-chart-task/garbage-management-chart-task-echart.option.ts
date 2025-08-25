import 'echarts-liquidfill';

export const GarbageManagementChartTaskEChartOption: any = {
  series: [
    {
      type: 'liquidFill',
      data: [
        {
          value: 0.93,
          itemStyle: {
            color: '#00f6ff', // 第一个波浪的颜色
            opacity: 0.4,
          },
        },
        {
          value: 0.85,
          itemStyle: {
            color: '#3006e3', // 第二个波浪的颜色
            opacity: 0.4,
          },
        },
      ],
      radius: '99%',
      center: ['50%', '50%'],
      amplitude: 8, // 减小波浪振幅，使其更平缓
      waveLength: '80%',
      phase: 'auto',
      period: 4000,
      direction: 'right',
      shape: 'circle',
      waveAnimation: true,
      animationDuration: 2000,
      animationDurationUpdate: 1000,
      outline: {
        show: true,
        borderDistance: 5,
        itemStyle: {
          color: 'none',
          borderColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#00f6ff', // 渐变开始颜色
              },
              {
                offset: 1,
                color: '#286cf1', // 渐变结束颜色
              },
            ],
          },
          borderWidth: 3,
          shadowBlur: 20, // 增加阴影模糊度
          shadowColor: '#286cf1', // 设置阴影颜色
        },
      },
      backgroundStyle: {
        color: 'transparent',
        borderWidth: 2,
        borderColor: 'rgba(40, 108, 241, 0.5)',
        shadowBlur: 50,
        shadowColor: 'rgba(40, 108, 241, 0.5)',
      },
      label: {
        show: false,
      },
      silent: true, // 屏蔽鼠标事件
    },
  ],
};
