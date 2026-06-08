import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorPointComponent } from '../../../../../../common/components/paginator-point/paginator-point.component';
import { PictureComponent } from '../../../../../../common/components/picture/component/picture.component';
import { IasEventRecord } from '../../../../../../common/network/model/ias/ias-event-record.model';
import { PagedArgs } from '../../../../../../common/network/model/model.interface';
import { Page } from '../../../../../../common/network/model/page_list.model';
import { GarbageManagementRecordEventIasTaskInfoComponent } from '../garbage-management-record-event-ias-task-info/garbage-management-record-event-ias-task-info.component';
import { GarbageManagementRecordEventIasTaskProgressComponent } from '../garbage-management-record-event-ias-task-progress/garbage-management-record-event-ias-task-progress.component';

@Component({
  selector: 'howell-garbage-management-record-event-ias-task-manager',
  imports: [
    CommonModule,
    PictureComponent,
    PaginatorPointComponent,
    GarbageManagementRecordEventIasTaskProgressComponent,
    GarbageManagementRecordEventIasTaskInfoComponent,
  ],
  templateUrl:
    './garbage-management-record-event-ias-task-manager.component.html',
  styleUrl: './garbage-management-record-event-ias-task-manager.component.less',
})
export class GarbageManagementRecordEventIasTaskManagerComponent
  implements OnInit
{
  @Input() data?: IasEventRecord;
  @Output() image = new EventEmitter<PagedArgs<IasEventRecord>>();

  constructor() {}

  ngOnInit(): void {
    if (this.data) {
      this.picture.task.init(this.data);
      this.picture.handle.init(this.data);
    }
  }

  picture = {
    task: {
      count: 0,
      index: 0,
      src: '',
      init: (data: IasEventRecord) => {
        if (data.Resources && data.Resources.length > 0) {
          this.picture.task.count = data.Resources.length;
          this.picture.task.index = 1;
          let resource = data.Resources[0];
          this.picture.task.src = resource.ImageUrl ?? '';
        }
      },
      on: {
        change: (index: number) => {
          if (
            this.data &&
            this.data.Resources &&
            this.data.Resources.length >= index
          ) {
            let resource = this.data.Resources[index - 1];
            this.picture.task.src = resource.ImageUrl ?? '';
          }
        },
        click: (index: number) => {
          let count = this.picture.task.count + this.picture.handle.count;
          let page = new Page();
          page.PageIndex = index;
          page.PageSize = count;
          page.RecordCount = count;
          page.TotalRecordCount = count;
          page.PageCount = 1;
          let paged: PagedArgs = {
            page: page,
            data: this.data,
          };
          this.image.emit(paged);
        },
      },
    },
    handle: {
      count: 0,
      index: 0,
      src: '',
      init: (data: IasEventRecord) => {
        if (data.Assignment) {
          if (
            data.Assignment.HandledImageUrls &&
            data.Assignment.HandledImageUrls.length > 0
          ) {
            this.picture.handle.count = data.Assignment.HandledImageUrls.length;
            this.picture.handle.index = 1;
            let url = data.Assignment.HandledImageUrls[0];
            this.picture.handle.src = url ?? '';
          }
        }
      },
      on: {
        change: (index: number) => {
          if (
            this.data &&
            this.data.Assignment &&
            this.data.Assignment.HandledImageUrls &&
            this.data.Assignment.HandledImageUrls.length >= index
          ) {
            let url = this.data.Assignment.HandledImageUrls[index - 1];
            this.picture.task.src = url ?? '';
          }
        },
        click: (index: number) => {
          let count = this.picture.task.count + this.picture.handle.count;
          let page = new Page();
          page.PageIndex = count + index;
          page.PageSize = count;
          page.RecordCount = count;
          page.TotalRecordCount = count;
          page.PageCount = 1;
          let paged: PagedArgs = {
            page: page,
            data: this.data,
          };
          this.image.emit(paged);
        },
      },
    },
  };
}
