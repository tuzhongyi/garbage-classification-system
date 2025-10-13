import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PictureComponent } from '../../../../../../common/components/picture/component/picture.component';
import { WheelHorizontalScrollDirective } from '../../../../../../common/directives/wheel-horizontal-scroll/wheel-horizontal-scroll.directive';
import { IllegalVehicleEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/illegal-vehicle-event-record.model';
import { PagedArgs } from '../../../../../../common/network/model/model.interface';
import { Page } from '../../../../../../common/network/model/page_list.model';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';
import { VideoImageComponent } from '../../../../../share/video/video-image/video-image.component';
import { MKVVideoArgs } from '../../../../garbage-management-manager/window/video/garbage-management-manager-video-single-mkv.window';
import { GarbageManagementRecordEventIllegalVehicleTaskInfoComponent } from '../garbage-management-record-event-illegal-vehicle-task-info/garbage-management-record-event-illegal-vehicle-task-info.component';
import { GarbageManagementRecordEventIllegalVehicleTaskProgressComponent } from '../garbage-management-record-event-illegal-vehicle-task-progress/garbage-management-record-event-illegal-vehicle-task-progress.component';

@Component({
  selector:
    'howell-garbage-management-record-event-illegal-vehicle-task-manager',
  imports: [
    CommonModule,
    PictureComponent,
    VideoImageComponent,
    WheelHorizontalScrollDirective,
    GarbageManagementRecordEventIllegalVehicleTaskProgressComponent,
    GarbageManagementRecordEventIllegalVehicleTaskInfoComponent,
  ],
  templateUrl:
    './garbage-management-record-event-illegal-vehicle-task-manager.component.html',
  styleUrl:
    './garbage-management-record-event-illegal-vehicle-task-manager.component.less',
})
export class GarbageManagementRecordEventIllegalVehicleTaskManagerComponent
  implements OnInit
{
  @Input() data?: IllegalVehicleEventRecord;
  @Output() image = new EventEmitter<PagedArgs<IllegalVehicleEventRecord>>();
  @Output('video') _video = new EventEmitter<
    PagedArgs<IllegalVehicleEventRecord>
  >();

  constructor() {}

  ngOnInit(): void {
    if (this.data) {
      this.picture.load(this.data);
      this.video.load(this.data);
    }
  }

  video = {
    datas: [] as MKVVideoArgs[],
    load: (data: IllegalVehicleEventRecord) => {
      this.video.datas = ObjectTool.model.record.illegalvehicle.videos(data);
    },
    on: {
      click: (index: number) => {
        let page = this.page(this.video.datas, index + 1);
        let paged: PagedArgs = {
          page: page,
          data: this.data,
        };
        this._video.emit(paged);
      },
    },
  };

  picture = {
    datas: [] as string[],
    load: (data: IllegalVehicleEventRecord) => {
      this.picture.datas = ObjectTool.model.record.illegalvehicle.images(data);
    },
    on: {
      click: (index: number) => {
        let page = this.page(this.picture.datas, index + 1);
        let paged: PagedArgs = {
          page: page,
          data: this.data,
        };
        this.image.emit(paged);
      },
    },
  };

  private page<T>(datas: T[], index: number) {
    let page = new Page();
    page.PageIndex = index;
    page.PageSize = datas.length;
    page.RecordCount = datas.length;
    page.TotalRecordCount = datas.length;
    page.PageCount = 1;
    return page;
  }
}
