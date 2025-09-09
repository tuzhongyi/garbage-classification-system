import { EventType } from '../../../../../common/enum/event-type.enum';
import { ColorTool } from '../../../../../common/tools/color-tool/color.tool';

export const GarbageManagementChartPieRecordStatisticOption: any = {
  color: [
    ColorTool.station.state.mixedinto,
    ColorTool.station.state.garbagefull,
    ColorTool.station.state.illegaldrop,
    ColorTool.station.state.garbagedrop,
    ColorTool.station.state.illegalvehicle,
    ColorTool.station.state.garbageexposed,
  ],
  series: [
    {
      type: 'pie',
      radius: ['55%', '70%'],

      z: 1,
      silent: true,
      label: { show: false },
      itemStyle: {
        borderColor: '#1B1E53',
        borderWidth: 2,
      },
      data: [
        { id: EventType.MixedInto, value: 0, name: '混合投放' },
        { id: EventType.GarbageFull, value: 0, name: '垃圾满溢' },
        { id: EventType.IllegalDrop, value: 0, name: '垃圾乱投' },
        { id: EventType.GarbageDrop, value: 0, name: '垃圾滞留' },
        { id: EventType.IllegalVehicle, value: 0, name: '非法清运' },
        { id: 0, value: 0, name: '暴露垃圾' },
      ],
    },
    {
      type: 'pie',
      radius: ['70%', '85%'],

      z: 2,
      silent: true,
      label: { show: false },
      itemStyle: {
        opacity: 0.3,
        borderColor: '#1B1E53',
        borderWidth: 2,
      },
      data: [
        { id: 1, value: 0, name: '机动车乱停' },
        { id: 2, value: 0, name: '非机动车乱停' },
        { id: 3, value: 0, name: '暴露垃圾' },
        { id: 4, value: 0, name: '道路设施损坏' },
        { id: 5, value: 0, name: '占道经营' },
        { id: 6, value: 0, name: '占道施工' },
        { id: 7, value: 0, name: '飞线充电' },
      ],
    },
  ],
};
