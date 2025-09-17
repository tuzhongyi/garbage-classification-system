import { EventType } from '../../../../../../../common/enum/event-type.enum';
import { GarbageStationNumberStatisticV2 } from '../../../../../../../common/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { StatisticTime } from '../../../../../../../common/network/model/garbage-station/statistic-time.model';
import { ArrayTool } from '../../../../../../../common/tools/array-tool/array.tool';
import { ColorTool } from '../../../../../../../common/tools/color-tool/color.tool';
import { IGarbageManagementChartRecordEventData } from '../../../../../garbage-management-chart/garbage-management-chart-record-event/garbage-management-chart-record-event.model';
import {
  GarbageStationNumberStatisticV2Group,
  StatisticType,
} from '../../garbage-management-station-statistic-details.model';

export class GarbageManagementStationStatisticDetailsContainerConverter {
  converter = {
    group: new GroupConverter(),
    item: new GarbageStationWindowDetailsGroupConverter(),
  };
  Convert(
    source: GarbageStationNumberStatisticV2[],
    type: StatisticType
  ): IGarbageManagementChartRecordEventData<number>[] {
    let groups = this.converter.group.Convert(source);
    let models = groups.map((x) => {
      return this.converter.item.Convert(x, type);
    });

    models.forEach((x, i) => {
      x.color = this.colors[i];
    });

    return models;
  }

  private colors = [
    ColorTool.chart.line.get(0, 255, 255),
    ColorTool.chart.line.get(255, 0, 240),
    ColorTool.chart.line.get(255, 140, 0),
    ColorTool.chart.line.get(255, 255, 0),
    ColorTool.chart.line.get(247, 61, 61),
    ColorTool.chart.line.get(0, 179, 255),
  ];
}

class GroupConverter {
  Convert(
    source: GarbageStationNumberStatisticV2[],
    ...res: any[]
  ): GarbageStationNumberStatisticV2Group[] {
    let group = ArrayTool.groupBy(source, (x) => x.Id);
    let groups = new Array<GarbageStationNumberStatisticV2Group>();
    for (const key in group) {
      if (Object.prototype.hasOwnProperty.call(group, key)) {
        const element = group[key];
        let g = new GarbageStationNumberStatisticV2Group();
        g.Id = key;
        g.Name = element[0].Name;
        g.datas = element;
        groups.push(g);
      }
    }
    return groups;
  }
}

class GarbageStationWindowDetailsGroupConverter {
  Convert(
    source: GarbageStationNumberStatisticV2Group,
    type: StatisticType
  ): IGarbageManagementChartRecordEventData<number> {
    switch (type) {
      case StatisticType.garde:
        return this.fromGarbageRatio(source);
      case StatisticType.avgGarbageTime:
        return this.fromAvgDropDuration(source);
      case StatisticType.maxGarbageTime:
        return this.fromMaxDropDuration(source);
      case StatisticType.garbageDuration:
        return this.fromCountDropDuration(source);
      case StatisticType.illegalDrop:
        return this.fromEventRecord(source, EventType.IllegalDrop);
      case StatisticType.mixedInto:
        return this.fromEventRecord(source, EventType.MixedInto);
      default:
        throw new Error('type is error');
    }
  }

  fromGarbageRatio(
    source: GarbageStationNumberStatisticV2Group
  ): IGarbageManagementChartRecordEventData<number> {
    return {
      Id: source.Id,
      Name: source.Name,
      datas: source.datas.map((x) => {
        return {
          time: StatisticTime.toDate(x.Time),
          value: parseFloat((x.GarbageRatio ?? 0).toFixed(2)),
        };
      }),
    };
  }
  fromAvgDropDuration(
    source: GarbageStationNumberStatisticV2Group
  ): IGarbageManagementChartRecordEventData<number> {
    return {
      Id: source.Id,
      Name: source.Name,
      datas: source.datas.map((x) => {
        return {
          time: StatisticTime.toDate(x.Time),
          value: Math.ceil(x.AvgGarbageTime ?? 0),
        };
      }),
    };
  }
  fromMaxDropDuration(source: GarbageStationNumberStatisticV2Group) {
    return {
      Id: source.Id,
      Name: source.Name,
      datas: source.datas.map((x) => {
        return {
          time: StatisticTime.toDate(x.Time),
          value: Math.ceil(x.MaxGarbageTime ?? 0),
        };
      }),
    };
  }
  fromCountDropDuration(source: GarbageStationNumberStatisticV2Group) {
    return {
      Id: source.Id,
      Name: source.Name,
      datas: source.datas.map((x) => {
        return {
          time: StatisticTime.toDate(x.Time),
          value: Math.ceil(x.GarbageDuration ?? 0),
        };
      }),
    };
  }
  fromEventRecord(
    source: GarbageStationNumberStatisticV2Group,
    eventType: EventType
  ) {
    return {
      Id: source.Id,
      Name: source.Name,
      datas: source.datas.map((x) => {
        let count = 0;
        if (x.EventNumbers) {
          for (let i = 0; i < x.EventNumbers.length; i++) {
            const event = x.EventNumbers[i];
            if (event.EventType === eventType) {
              count += event.DeltaNumber ?? 0;
            }
          }
        }
        return {
          time: StatisticTime.toDate(x.Time),
          value: count,
        };
      }),
    };
  }
}
