import { CommonModule, formatDate } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as echarts from 'echarts/core';

import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { IllegalDropEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { GarbageStationGarbageCountStatistic } from '../../../../../../common/network/model/garbage-station/garbage-station-sarbage-count-statistic.model';
import { Language } from '../../../../../../common/tools/language';
import { wait } from '../../../../../../common/tools/wait.tools';
import { GarbageDropDurationPanelComponent } from '../garbage-drop-duration-panel/garbage-drop-duration-panel.component';
import { GarbageDropDurationPanelModel } from '../garbage-drop-duration-panel/garbage-drop-duration-panel.model';
import { GarbageDropEventPanelComponent } from '../garbage-drop-event-panel/garbage-drop-event-panel.component';
import { LineZoomChartBusiness } from './line-zoom-chart.business';
import {
  LineZoomChartArgs,
  LineZoomChartInputArgs,
  LineZoomChartModel,
  LineZoomLinePanel,
  LineZoomScatterPanel,
  SerieIndex,
  TimeString,
} from './line-zoom-chart.model';
import { option } from './line-zoom-chart.option';
@Component({
  selector: 'howell-line-zoom-chart',
  imports: [
    CommonModule,
    GarbageDropDurationPanelComponent,
    GarbageDropEventPanelComponent,
  ],
  templateUrl: './line-zoom-chart.component.html',
  styleUrls: ['./line-zoom-chart.component.less'],
  providers: [LineZoomChartBusiness],
})
export class LineZoomChartComponent implements OnInit, AfterViewInit {
  @Input() args?: LineZoomChartInputArgs;
  @Input() unit: TimeUnit = TimeUnit.Hour;

  @Input() load?: EventEmitter<LineZoomChartInputArgs>;

  @Output() media: EventEmitter<IllegalDropEventRecord> = new EventEmitter();

  @Output() ondblclick: EventEmitter<LineZoomChartArgs> = new EventEmitter();

  constructor(private business: LineZoomChartBusiness) {}

  @ViewChild('echarts')
  echarts?: ElementRef<HTMLDivElement>;

  garbageDropModel = new GarbageDropDurationPanelModel();

  panel = {
    line: new LineZoomLinePanel(),
    scatter: new LineZoomScatterPanel<IllegalDropEventRecord>(),
  };

  data?: LineZoomChartModel;
  xAxisData: Array<TimeString> = [];

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((args) => {
        this.args = args;
        this.panel.line.display = false;
        this.panel.scatter.display = false;
        this.business
          .load(args.stationId, this.args.date, this.unit)
          .then((data) => {
            this.data = data;
            this.setOption(this.data, option);
          });
      });
    }
  }
  loaded = false;
  inited = false;
  ngAfterViewInit(): void {
    wait(() => {
      if (this.echarts) {
        let div = this.echarts.nativeElement as HTMLDivElement;
        return div.offsetWidth > 0 && div.offsetHeight > 0;
      }
      return false;
    }).then(async () => {
      if (this.loaded == false) {
        this.loaded = true;
        if (this.echarts) {
          this.chart = echarts.init(this.echarts.nativeElement, 'dark');
          this.chart.on('click', 'series.line', (trigger: any) => {
            this.showLinePanel(trigger);
          });
          this.chart.on('click', 'series.scatter', (trigger: any) => {
            this.showScatterPanel(trigger);
          });

          this.chart.getZr().on('click', () => {
            this.panel.line.display = false;
            this.panel.scatter.display = false;
          });
          this.chart.getZr().on('dblclick', (params: any) => {
            if (!this.args) return;
            if (this.chart && this.data) {
              // console.log(params);
              let pointInPixel = [params.offsetX, params.offsetY];
              let grid = this.chart.convertFromPixel(
                { seriesIndex: 0 },
                pointInPixel
              );
              let index = grid[0];
              let data = this.data.count.find((x) => x.index == index);
              let model: LineZoomChartArgs;

              if (data) {
                model = {
                  date: data.time,
                  statistic: data.value,
                };
              } else {
                let xData = this.xAxisData[index];
                let statistic = new GarbageStationGarbageCountStatistic();
                statistic.BeginTime = xData.date;
                statistic.GarbageCount = 0;
                statistic.Id = this.args.stationId ?? '';
                model = {
                  date: xData.date,
                  statistic: statistic,
                };
              }

              this.ondblclick.emit(model);
            }
          });
        }
        if (this.args) {
          this.data = await this.business.load(
            this.args.stationId,
            this.args.date,
            this.unit
          );
          this.setOption(this.data, option);
        }
      }
    });
  }

  showLinePanel(trigger: any) {
    this.panel.scatter.display = false;
    this.panel.line.display = trigger.data > 0;

    if (this.panel.line.display) {
      this.panel.line.position.x = trigger.event.offsetX - 105 + 'px';
      this.panel.line.position.y = '-70px';
      // trigger.event.offsetY - 82 - 20 - 5 + 'px';
      if (this.data) {
        let data = this.data.count.find((x) => {
          let key = formatDate(x.time, 'HH:mm', 'en');
          return trigger.name == key;
        });
        if (data) {
          this.panel.line.model.date = formatDate(
            data.value.BeginTime,
            Language.yyyyMMdd,
            'en'
          );
          this.panel.line.model.time = trigger.name;
          this.panel.line.model.garbageCount = data.value.GarbageCount;
          if (data.value.GarbageDuration) {
            this.panel.line.model.dropDuration =
              Language.Time(data.value.GarbageDuration, 'minute') ?? '';
          }
        }
      }
    }
  }

  showScatterPanel(trigger: any) {
    this.panel.line.display = false;
    this.panel.scatter.display = true;
    if (this.panel.scatter.display) {
      this.panel.scatter.position.x = trigger.event.offsetX + 'px';
      this.panel.scatter.position.y = '110px';
      // trigger.event.offsetY - 120 - 20 - 5 + 'px';
      if (this.data) {
        let data = this.data.record.find((x) => {
          let key = formatDate(x.time, 'HH:mm', 'en');
          return trigger.name == key;
        });
        if (data) {
          this.panel.scatter.data = data.value;
          this.panel.scatter.src = data.image;
        }
      }
    }
  }
  optionProcess1(model: LineZoomChartModel, option: any) {
    if (!this.args) return;
    let begin = new Date(
      this.args.date.getFullYear(),
      this.args.date.getMonth(),
      this.args.date.getDate(),
      model.timeRange ? model.timeRange.BeginTime.hour : 9,
      model.timeRange ? model.timeRange.BeginTime.minute : 0
    );
    let minutes = model.timeRange
      ? model.timeRange.EndTime.toMinutes() -
        model.timeRange.BeginTime.toMinutes()
      : 12 * 60;
    this.xAxisData = [];
    let counts = new Array();
    let records = new Array();
    let last: TimeString | undefined;
    for (let i = 0, offset = { count: 0, record: 0 }; i <= minutes; i++) {
      let now = new Date(begin.getTime());
      now.setMinutes(i);
      last = new TimeString(now, 'HH:mm');
      this.xAxisData.push(last);
      if (
        model.count &&
        model.count[offset.count] &&
        model.count[offset.count].time.getTime() === now.getTime()
      ) {
        let value =
          model.count[offset.count].value.GarbageCount > 0 ? 1 : 0.001;
        model.count[offset.count].index = i;
        counts.push(value);
        offset.count++;
      } else {
        counts.push(-0.001);
      }
    }

    if (model.record) {
      for (let i = 0; i < model.record.length; i++) {
        model.record[i].index = i;
        let formatter = formatDate(model.record[i].time, 'HH:mm', 'en');
        records.push([formatter, -0.1]);
      }
    }

    if (this.xAxisData.length % 2 === 0 && last) {
      this.xAxisData.push(last);
    }

    option.xAxis.data = this.xAxisData;
    option.series[0].data = counts;

    option.series[1].data = records;

    return option;
  }
  optionProcess(model: LineZoomChartModel, option: any) {
    if (!this.args) return;
    let begin = new Date(
      this.args.date.getFullYear(),
      this.args.date.getMonth(),
      this.args.date.getDate(),
      model.timeRange ? model.timeRange.BeginTime.hour : 9,
      model.timeRange ? model.timeRange.BeginTime.minute : 0
    );
    let minutes = model.timeRange
      ? model.timeRange.EndTime.toMinutes() -
        model.timeRange.BeginTime.toMinutes()
      : 12 * 60;
    this.xAxisData = [];
    let counts = new Array();
    let records = new Array();
    let last: TimeString | undefined;
    let normal = [];
    let offline = [];
    let target = [];
    for (let i = 0, offset = { count: 0, record: 0 }; i <= minutes; i++) {
      let now = new Date(begin.getTime());
      now.setMinutes(i);
      last = new TimeString(now, 'HH:mm');
      this.xAxisData.push(last);
      let time: Date | undefined = undefined;
      if (
        model.count &&
        model.count[offset.count] &&
        model.count[offset.count].time
      ) {
        time = model.count[offset.count].time;
      }
      if (time && time.getTime() === now.getTime()) {
        model.count[offset.count].index = i;
        offline.push(null);
        if (model.count[offset.count].value.GarbageCount > 0) {
          target.push(1);
          if (target.length > 1 && target[target.length - 2] === null) {
            target[target.length - 2] = 0;
          }
          normal.push(null);
        } else {
          normal.push(0);
          target.push(null);
          if (target.length > 1 && target[target.length - 2] === 1) {
            target[target.length - 1] = 0;
          }
        }

        offset.count++;
      } else {
        normal.push(null);
        target.push(null);
        offline.push(0);

        if (target.length > 1 && target[target.length - 2] === 1) {
          target[target.length - 1] = 0;
        }
      }
    }

    if (model.record) {
      for (let i = 0; i < model.record.length; i++) {
        model.record[i].index = i;
        let formatter = formatDate(model.record[i].time, 'HH:mm', 'en');
        records.push([formatter, -0.1]);
      }
    }

    if (this.xAxisData.length % 2 === 0 && last) {
      this.xAxisData.push(last);
    }

    option.xAxis.data = this.xAxisData;
    option.series[SerieIndex.normal].data = normal;
    option.series[SerieIndex.offline].data = offline;
    option.series[SerieIndex.target].data = target;
    option.series[SerieIndex.record].data = records;

    return option;
  }

  chart?: echarts.ECharts;

  setOption(data: LineZoomChartModel, opt: any) {
    if (this.chart) {
      this.chart.resize();
      let option = this.optionProcess(data, opt);

      this.chart.setOption(option);
    }
  }

  onEventPanelClicked() {
    if (this.panel.scatter.data) {
      this.media.emit(this.panel.scatter.data);
    }
  }
}
