import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time/date-time-control/date-time-control.component';
import { PictureComponent } from '../../../../../../common/components/picture/component/picture.component';
import { HowellSelectComponent } from '../../../../../../common/components/select/hw-select/select-control.component';
import { StationType } from '../../../../../../common/enum/station-type.enum';
import { IllegalDropEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { Language } from '../../../../../../common/tools/language';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';
import { wait } from '../../../../../../common/tools/wait.tools';
import { SelectDivisionComponent } from '../../../../../share/select/select-division/select-division.component';
import { SelectSearchGarbageStationComponent } from '../../../../../share/select/select-garbage-station-search/select-garbage-station-search.component';
import { VideoComponent } from '../../../../../share/video/component/video.component';
import { VideoMultipleComponent } from '../../../../../share/video/video-multiple/video-multiple.component';
import { HowellWindowComponent } from '../../../../../share/window/window.component';
import { GarbageManagementRecordEventGarbageDropArgs } from '../../garbage-management-record-event-garbage-drop.model';
import { GarbageManagementRecordEventGarbageDropDurationContainerComponent } from '../garbage-management-record-event-garbage-drop-duration-container/garbage-management-record-event-garbage-drop-duration-container.component';
import { GarbageManagementRecordEventGarbageDropDurationInfoComponent } from '../garbage-management-record-event-garbage-drop-duration-info/garbage-management-record-event-garbage-drop-duration-info.component';
import { LineZoomChartArgs } from '../line-zoom-chart/line-zoom-chart.model';
import { GarbageManagementRecordEventGarbageDropDurationManagerBusiness } from './garbage-management-record-event-garbage-drop-duration-manager.business';
import { GarbageManagementRecordEventGarbageDropDurationManagerWindow } from './garbage-management-record-event-garbage-drop-duration-manager.window';

@Component({
  selector:
    'howell-garbage-management-record-event-garbage-drop-duration-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    HowellSelectComponent,
    SelectDivisionComponent,
    SelectSearchGarbageStationComponent,
    GarbageManagementRecordEventGarbageDropDurationContainerComponent,
    HowellWindowComponent,
    PictureComponent,
    VideoMultipleComponent,
    VideoComponent,
    GarbageManagementRecordEventGarbageDropDurationInfoComponent,
  ],
  templateUrl:
    './garbage-management-record-event-garbage-drop-duration-manager.component.html',
  styleUrl:
    './garbage-management-record-event-garbage-drop-duration-manager.component.less',
  providers: [GarbageManagementRecordEventGarbageDropDurationManagerBusiness],
})
export class GarbageManagementRecordEventGarbageDropDurationManagerComponent
  implements OnInit, OnChanges
{
  @Input() args: GarbageManagementRecordEventGarbageDropArgs = {};
  @Output() argsChange =
    new EventEmitter<GarbageManagementRecordEventGarbageDropArgs>();

  constructor(
    private business: GarbageManagementRecordEventGarbageDropDurationManagerBusiness
  ) {}

  Language = Language;
  window = new GarbageManagementRecordEventGarbageDropDurationManagerWindow();

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
  private capture = {
    did: false,
    doing: false,
    do: () => {
      return new Promise<void>((resolve) => {
        if (this.window.video.multiple.stationId) {
          this.capture.doing = true;
          this.business
            .capture(this.window.video.multiple.stationId)
            .then((pictures) => {
              this.window.video.multiple.datas = pictures.map((picture) => {
                return ObjectTool.model.camera.picture.video(picture);
              });
            })
            .finally(() => {
              this.capture.did = true;
              resolve();
              this.capture.doing = false;
            });
        }
      });
    },
  };

  private init = {
    did: false,
    do: () => {
      wait(() => {
        return !!this.chart.args.stationId && this.init.did;
      })
        .then(() => {
          this.on.search();
        })
        .catch(() => {
          console.warn(
            'GarbageManagementRecordEventGarbageDropDurationManagerComponent init failed'
          );
        });
    },
  };
  private change = {
    args: (simple: SimpleChange) => {
      if (simple) {
        if (
          this.args.stationId &&
          this.chart.args.stationId != this.args.stationId
        ) {
          this.chart.args.stationId = this.args.stationId;
        }
        if (
          this.args.divisionId &&
          this.chart.args.divisionId != this.args.divisionId
        ) {
          this.chart.args.divisionId = this.args.divisionId;
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.args(changes['args']);
  }

  ngOnInit(): void {
    this.init.do();
  }

  on = {
    inited: () => {
      this.init.did = true;
    },
    change: {
      station: () => {
        this.args.stationId = this.chart.args.stationId;
        this.argsChange.emit(this.args);
      },
      division: () => {
        this.args.divisionId = this.chart.args.divisionId;
        this.argsChange.emit(this.args);
      },
    },
    search: () => {
      this.chart.load.emit(this.chart.args);
    },
    media: (data: IllegalDropEventRecord) => {
      this.window.image.open(data);
    },
    statistic: (data: LineZoomChartArgs) => {
      if (data.statistic) {
        let stationId = data.statistic.Id;
        this.business.get(data.statistic.Id).then((station) => {
          if (station.Cameras) {
            let videos = station.Cameras.map((x) =>
              ObjectTool.model.camera.playback(x, data.date)
            );
            this.window.video.multiple.open(
              station.Name,
              stationId,
              videos,
              data.date,
              data.statistic
            );
          }
        });
      }

      this.window.video.multiple.datas;
    },
    error: () => {
      if (this.capture.did == false && this.capture.doing == false) {
        this.capture.do();
      }
    },
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
