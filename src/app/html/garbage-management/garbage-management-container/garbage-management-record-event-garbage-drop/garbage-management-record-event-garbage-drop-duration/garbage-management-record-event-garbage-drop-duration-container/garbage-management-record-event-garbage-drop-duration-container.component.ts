import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IllegalDropEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { LineZoomChartComponent } from '../line-zoom-chart/line-zoom-chart.component';
import {
  LineZoomChartArgs,
  LineZoomChartInputArgs,
} from '../line-zoom-chart/line-zoom-chart.model';

@Component({
  selector:
    'howell-garbage-management-record-event-garbage-drop-duration-container',
  imports: [CommonModule, LineZoomChartComponent],
  templateUrl:
    './garbage-management-record-event-garbage-drop-duration-container.component.html',
  styleUrl:
    './garbage-management-record-event-garbage-drop-duration-container.component.less',
})
export class GarbageManagementRecordEventGarbageDropDurationContainerComponent {
  @Input() args?: LineZoomChartInputArgs;
  @Input() load?: EventEmitter<LineZoomChartInputArgs>;
  @Output() media = new EventEmitter<IllegalDropEventRecord>();
  @Output() statistic = new EventEmitter<LineZoomChartArgs>();

  on = {
    media: (data: IllegalDropEventRecord) => {
      this.media.emit(data);
    },
    video: {
      multiple: (args: LineZoomChartArgs) => {
        this.statistic.emit(args);
      },
    },
  };
}
