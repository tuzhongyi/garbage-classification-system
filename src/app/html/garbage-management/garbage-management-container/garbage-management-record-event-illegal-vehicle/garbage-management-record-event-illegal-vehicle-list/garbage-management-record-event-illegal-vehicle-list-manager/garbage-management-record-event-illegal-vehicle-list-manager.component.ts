import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../../common/components/select/hw-select/select-control.component';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { StationType } from '../../../../../../common/enum/station-type.enum';
import { IllegalVehicleEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/illegal-vehicle-event-record.model';
import { PagedArgs } from '../../../../../../common/network/model/model.interface';
import { PagedList } from '../../../../../../common/network/model/page_list.model';
import { CameraImageUrl } from '../../../../../../common/network/model/url-model/camera-image-url.model';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';
import { SelectDivisionComponent } from '../../../../../share/select/select-division/select-division.component';
import { SelectGarbageStationComponent } from '../../../../../share/select/select-garbage-station/select-garbage-station.component';
import { GarbageManagementRecordEventIllegalVehicleListTableComponent } from '../garbage-management-record-event-illegal-vehicle-list-table/garbage-management-record-event-illegal-vehicle-list-table.component';
import { GarbageManagementRecordEventIllegalVehicleListTableArgs } from '../garbage-management-record-event-illegal-vehicle-list-table/garbage-management-record-event-illegal-vehicle-list-table.model';
import { GarbageManagementRecordEventIllegalVehicleListManagerBusiness } from './garbage-management-record-event-illegal-vehicle-list-manager.business';
import { GarbageManagementRecordEventIllegalVehicleListConfirmWindow } from './garbage-management-record-event-illegal-vehicle-list-manager.model';

@Component({
  selector:
    'howell-garbage-management-record-event-illegal-vehicle-list-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    SelectDivisionComponent,
    SelectGarbageStationComponent,
    HowellSelectComponent,
    WindowConfirmComponent,
    GarbageManagementRecordEventIllegalVehicleListTableComponent,
  ],
  templateUrl:
    './garbage-management-record-event-illegal-vehicle-list-manager.component.html',
  styleUrl:
    './garbage-management-record-event-illegal-vehicle-list-manager.component.less',
  providers: [GarbageManagementRecordEventIllegalVehicleListManagerBusiness],
})
export class GarbageManagementRecordEventIllegalVehicleListManagerComponent {
  @Output() image = new EventEmitter<PagedList<CameraImageUrl>>();
  @Output() video = new EventEmitter<IllegalVehicleEventRecord>();
  @Output() videoall = new EventEmitter<IllegalVehicleEventRecord>();
  @Output() complete = new EventEmitter<IllegalVehicleEventRecord>();

  constructor(
    private business: GarbageManagementRecordEventIllegalVehicleListManagerBusiness,
    private toastr: ToastrService
  ) {}

  confirm = new GarbageManagementRecordEventIllegalVehicleListConfirmWindow();

  table = {
    args: new GarbageManagementRecordEventIllegalVehicleListTableArgs(),
    load: new EventEmitter<GarbageManagementRecordEventIllegalVehicleListTableArgs>(),
    station: {
      types: [StationType.IllegalDump],
    },
  };

  name = {
    type: 'station',
  };

  on = {
    search: () => {
      this.table.load.emit(this.table.args);
    },
    name: () => {
      switch (this.name.type) {
        case 'station':
          this.table.args.communityname = undefined;
          break;
        case 'community':
          this.table.args.stationname = undefined;
          break;

        default:
          break;
      }
    },

    image: (data: PagedArgs<IllegalVehicleEventRecord>) => {
      let datas = ObjectTool.model.record.illegalvehicle.images(data.data);
      let cameras = datas.map((x) => {
        let camera = new CameraImageUrl();
        camera.CameraName = data.data.Data.StationName;
        camera.ImageUrl = x;
        return camera;
      });
      let paged = PagedList.create(cameras, data.page.PageIndex, 1);
      this.image.emit(paged);
    },
    video: {
      single: (data: IllegalVehicleEventRecord) => {
        this.video.emit(data);
      },
      all: (data: IllegalVehicleEventRecord) => {
        this.videoall.emit(data);
      },
    },
    complete: (data: IllegalVehicleEventRecord) => {
      this.complete.emit(data);
    },
    enable: {
      confirm: (data: IllegalVehicleEventRecord) => {
        this.confirm.data = data;
        this.confirm.show = true;
      },
      ok: () => {
        if (this.confirm.data) {
          this.business
            .enable(this.confirm.data)
            .then((x) => {
              this.toastr.success('操作成功');
              this.on.search();
              this.confirm.show = false;
            })
            .catch((e) => {
              this.toastr.error('操作失败 ' + e.error?.Message);
            });
        }
      },
    },
  };
}
