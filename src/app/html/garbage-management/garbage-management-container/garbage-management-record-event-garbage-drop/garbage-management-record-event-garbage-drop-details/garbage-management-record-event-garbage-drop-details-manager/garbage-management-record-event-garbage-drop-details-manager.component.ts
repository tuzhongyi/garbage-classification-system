import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time/date-time-control/date-time-control.component';
import { PictureComponent } from '../../../../../../common/components/picture/component/picture.component';
import { HowellSelectComponent } from '../../../../../../common/components/select/hw-select/select-control.component';
import { StationType } from '../../../../../../common/enum/station-type.enum';
import { IllegalDropEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { Language } from '../../../../../../common/tools/language';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';
import { SelectDivisionComponent } from '../../../../../share/select/select-division/select-division.component';
import { SelectGarbageStationComponent } from '../../../../../share/select/select-garbage-station/select-garbage-station.component';
import { VideoComponent } from '../../../../../share/video/component/video.component';
import { VideoMultipleComponent } from '../../../../../share/video/video-multiple/video-multiple.component';
import { HowellWindowComponent } from '../../../../../share/window/window.component';
import { GarbageManagementRecordEventGarbageDropDetailsContainerComponent } from '../garbage-management-record-event-garbage-drop-details-container/garbage-management-record-event-garbage-drop-details-container.component';
import { LineZoomChartArgs } from '../line-zoom-chart/line-zoom-chart.model';
import { GarbageManagementRecordEventGarbageDropDetailsManagerBusiness } from './garbage-management-record-event-garbage-drop-details-manager.business';
import { GarbageManagementRecordEventGarbageDropDetailsManagerWindow } from './garbage-management-record-event-garbage-drop-details-manager.window';

@Component({
  selector:
    'howell-garbage-management-record-event-garbage-drop-details-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    HowellSelectComponent,
    SelectDivisionComponent,
    SelectGarbageStationComponent,
    GarbageManagementRecordEventGarbageDropDetailsContainerComponent,
    HowellWindowComponent,
    PictureComponent,
    VideoMultipleComponent,
    VideoComponent,
  ],
  templateUrl:
    './garbage-management-record-event-garbage-drop-details-manager.component.html',
  styleUrl:
    './garbage-management-record-event-garbage-drop-details-manager.component.less',
  providers: [GarbageManagementRecordEventGarbageDropDetailsManagerBusiness],
})
export class GarbageManagementRecordEventGarbageDropDetailsManagerComponent {
  constructor(
    private business: GarbageManagementRecordEventGarbageDropDetailsManagerBusiness
  ) {}

  Language = Language;
  window = new GarbageManagementRecordEventGarbageDropDetailsManagerWindow();

  chart = {
    args: {
      date: new Date(),
      divisionId: '',
      stationId: '',
    },
    load: new EventEmitter<{ stationId: string; date: Date }>(),
    station: {
      types: [StationType.Garbage, StationType.Plus, StationType.Smart],
    },
  };

  on = {
    search: () => {
      this.chart.load.emit(this.chart.args);
    },
    media: (data: IllegalDropEventRecord) => {
      this.window.image.open(data);
    },
    statistic: (data: LineZoomChartArgs) => {
      if (data.statistic) {
        this.business.get(data.statistic.Id).then((station) => {
          if (station.Cameras) {
            let videos = station.Cameras.map((x) =>
              ObjectTool.model.camera.playback(x, data.date)
            );
            this.window.video.multiple.open(
              station.Name,
              videos,
              data.date,
              data.statistic
            );
          }
        });
      }

      this.window.video.multiple.datas;
    },
    play: () => {},
    download: {
      video: () => {
        let record = this.window.image.data;
        if (record && record.ResourceId) {
          this.business.download.video(
            record.Data.StationId,
            record.ResourceId,
            record.EventTime
          );
        }
      },
      image: () => {
        let record = this.window.image.data;
        if (record && record.ImageUrl) {
          this.business.download.image(
            record.ImageUrl,
            record.Data.StationName,
            record.EventTime
          );
        }
      },
    },
  };
}
