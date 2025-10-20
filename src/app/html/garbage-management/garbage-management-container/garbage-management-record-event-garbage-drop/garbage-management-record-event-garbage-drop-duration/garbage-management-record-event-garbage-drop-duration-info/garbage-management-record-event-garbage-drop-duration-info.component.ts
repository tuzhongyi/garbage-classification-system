import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { EventType } from '../../../../../../common/enum/event-type.enum';
import { GarbageStationNumberStatisticV2 } from '../../../../../../common/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { Language } from '../../../../../../common/tools/language';
import { GarbageManagementRecordEventGarbageDropDurationInfoBusiness } from './garbage-management-record-event-garbage-drop-duration-info.business';
import {
  GarbageDropDurationInfo,
  GarbageDropDurationInfoValue,
  GarbageManagementRecordEventGarbageDropDurationInfoArgs,
} from './garbage-management-record-event-garbage-drop-duration-info.model';

@Component({
  selector: 'howell-garbage-management-record-event-garbage-drop-duration-info',
  imports: [CommonModule],
  templateUrl:
    './garbage-management-record-event-garbage-drop-duration-info.component.html',
  styleUrl:
    './garbage-management-record-event-garbage-drop-duration-info.component.less',
  providers: [GarbageManagementRecordEventGarbageDropDurationInfoBusiness],
})
export class GarbageManagementRecordEventGarbageDropDurationInfoComponent
  implements OnInit, OnDestroy
{
  @Input() args?: GarbageManagementRecordEventGarbageDropDurationInfoArgs;
  @Input('load')
  _load?: EventEmitter<GarbageManagementRecordEventGarbageDropDurationInfoArgs>;

  constructor(
    private business: GarbageManagementRecordEventGarbageDropDurationInfoBusiness
  ) {}

  datas: GarbageDropDurationInfo[] = [];

  private subscription = new Subscription();
  private regist() {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.args = x;
        this.load(x.stationId, x.date);
      });
      this.subscription.add(sub);
    }
  }

  ngOnInit(): void {
    this.regist();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load(stationId: string, date: Date) {
    this.business.load(stationId, date).then((x) => {
      let grade = this.converter.grade(x);
      let avg = this.converter.duration.avg(x);
      let max = this.converter.duration.max(x);
      let count = this.converter.duration.count(x);
      let drop = this.converter.drop(x);
      let task = this.converter.task(x);
      this.datas = [grade, avg, max, count, drop, task];
    });
  }

  private converter = {
    grade: (data: GarbageStationNumberStatisticV2) => {
      let info = new GarbageDropDurationInfo();
      info.title = '评分';
      let content = {
        value: data.Grade || 100,
        unit: '分',
      };
      info.contents = [content];
      return info;
    },
    task: (data: GarbageStationNumberStatisticV2) => {
      let info = new GarbageDropDurationInfo();
      info.title = '任务数量';
      let content = {
        value: data.TotalTaskCount ?? 0,
        unit: '起',
      };
      info.contents = [content];
      return info;
    },
    drop: (data: GarbageStationNumberStatisticV2) => {
      let info = new GarbageDropDurationInfo();
      info.title = '垃圾落地';
      let value = 0;
      if (data.EventNumbers) {
        let event = data.EventNumbers.find(
          (x) =>
            x.EventType === EventType.IllegalDrop ||
            x.EventType === EventType.IllegalDrop2
        );
        if (event) {
          value = event.DeltaNumber ?? 0;
        }
      }
      let content = {
        value: value,
        unit: '起',
      };
      info.contents = [content];
      return info;
    },
    duration: {
      avg: (data: GarbageStationNumberStatisticV2) => {
        let info = new GarbageDropDurationInfo();
        info.title = '平均投放时长';
        if (data.AvgGarbageTime) {
          info.contents = this.converter.duration.content(data.AvgGarbageTime);
        }
        return info;
      },
      max: (data: GarbageStationNumberStatisticV2) => {
        let info = new GarbageDropDurationInfo();
        info.title = '最大滞留时长';
        if (data.MaxGarbageTime) {
          info.contents = this.converter.duration.content(data.MaxGarbageTime);
        }
        return info;
      },
      count: (data: GarbageStationNumberStatisticV2) => {
        let info = new GarbageDropDurationInfo();
        info.title = '总滞留时长';
        if (data.GarbageDuration) {
          info.contents = this.converter.duration.content(data.GarbageDuration);
        }
        return info;
      },
      content: (data: number) => {
        let time = Language.Time(data, 'minute');
        let index = time?.indexOf('小时') ?? -1;
        let content: GarbageDropDurationInfoValue[] = [];
        if (index >= 0) {
          let hour: GarbageDropDurationInfoValue;
          hour = {
            value: parseInt(time!.substring(0, index).trim()),
            unit: '小时',
          };
          content.push(hour);
          let minute: GarbageDropDurationInfoValue;
          minute = {
            value: parseInt(time!.substring(index + 2).trim()),
            unit: '分钟',
          };
          content.push(minute);
          return content;
        }
        let minute = {
          value: Math.ceil(data),
          unit: '分钟',
        };
        content = [minute];
        return content;
      },
    },
  };
}
