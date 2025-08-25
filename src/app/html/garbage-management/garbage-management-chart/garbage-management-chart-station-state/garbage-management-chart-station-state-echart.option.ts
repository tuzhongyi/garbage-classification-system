export const GarbageManagementChartStationStateEChartOption: echarts.EChartsOption =
  {
    series: [
      {
        name: 'normal',
        type: 'pie',
        radius: ['90%', '100%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        silent: true,
        itemStyle: {
          color: 'transparent',
          borderRadius: 0,
          borderColor: 'transparent',
          borderWidth: 0,
        },
        label: {
          show: false,
        },
        data: [
          {
            value: 0,
            name: '正常',
            itemStyle: {
              color: '#01fd74',
              opacity: 0.8,
            },
          },
          {
            value: 0,
          },
          {
            value: 0,
          },
          {
            value: 0,
          },
        ],
      },
      {
        name: 'normal',
        type: 'pie',
        radius: ['85%', '95%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        silent: true,
        itemStyle: {
          color: 'transparent',
          borderRadius: 0,
          borderColor: 'transparent',
          borderWidth: 0,
        },

        label: {
          show: false,
        },
        data: [
          {
            value: 0,
          },
          {
            value: 0,
            name: '异常',
            itemStyle: {
              color: '#ff4500',
              opacity: 0.8,
            },
          },
          {
            value: 0,
          },
          {
            value: 0,
          },
        ],
      },
      {
        name: 'normal',
        type: 'pie',
        radius: ['80%', '90%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        silent: true,
        itemStyle: {
          color: 'transparent',
          borderRadius: 0,
          borderColor: 'transparent',
          borderWidth: 0,
        },

        label: {
          show: false,
        },
        data: [
          {
            value: 0,
          },
          {
            value: 0,
          },
          {
            value: 0,
            name: '满溢',
            itemStyle: {
              color: '#ecec4c',
              opacity: 0.8,
            },
          },
          {
            value: 0,
          },
        ],
      },
      {
        name: 'normal',
        type: 'pie',
        radius: ['75%', '85%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        silent: true,
        itemStyle: {
          color: 'transparent',
          borderRadius: 0,
          borderColor: 'transparent',
          borderWidth: 0,
        },

        label: {
          show: false,
        },
        data: [
          {
            value: 0,
          },
          {
            value: 0,
          },
          {
            value: 0,
          },
          {
            value: 0,
            name: '滞留',
            itemStyle: {
              color: '#ff8625',
              opacity: 0.8,
            },
          },
        ],
      },
    ],
  };
