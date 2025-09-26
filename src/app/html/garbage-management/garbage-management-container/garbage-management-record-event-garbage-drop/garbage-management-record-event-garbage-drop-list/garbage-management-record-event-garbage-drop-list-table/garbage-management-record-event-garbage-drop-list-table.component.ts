import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorComponent } from '../../../../../../common/components/paginator/paginator.component';
import { ImageDirective } from '../../../../../../common/directives/image/image.directive';
import { WheelHorizontalScrollDirective } from '../../../../../../common/directives/wheel-horizontal-scroll/wheel-horizontal-scroll.directive';
import { StationState } from '../../../../../../common/enum/station-state.enum';
import { GarbageDropEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { PagedArgs } from '../../../../../../common/network/model/model.interface';
import { Page } from '../../../../../../common/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../../../../../../common/tools/component-tool/table-abstract.component';
import { GarbageManagementRecordEventGarbageDropListTableBusiness } from './garbage-management-record-event-garbage-drop-list-table.business';
import {
  GarbageDropEventRecordViewModel,
  GarbageManagementRecordEventGarbageDropListTableArgs,
} from './garbage-management-record-event-garbage-drop-list-table.model';

@Component({
  selector: 'howell-garbage-management-record-event-garbage-drop-list-table',
  imports: [
    CommonModule,
    PaginatorComponent,
    ImageDirective,
    WheelHorizontalScrollDirective,
  ],
  templateUrl:
    './garbage-management-record-event-garbage-drop-list-table.component.html',
  styleUrl:
    './garbage-management-record-event-garbage-drop-list-table.component.less',
  providers: [GarbageManagementRecordEventGarbageDropListTableBusiness],
})
export class GarbageManagementRecordEventGarbageDropListTableComponent
  extends PagedTableAbstractComponent<GarbageDropEventRecordViewModel>
  implements OnInit
{
  @Input()
  load?: EventEmitter<GarbageManagementRecordEventGarbageDropListTableArgs>;
  @Input() args = new GarbageManagementRecordEventGarbageDropListTableArgs();

  @Output() image = new EventEmitter<PagedArgs<GarbageDropEventRecord>>();
  @Output() video = new EventEmitter<GarbageDropEventRecord>();
  @Output() videoall = new EventEmitter<GarbageDropEventRecord>();
  @Output() complete = new EventEmitter<GarbageDropEventRecord>();

  constructor(
    private business: GarbageManagementRecordEventGarbageDropListTableBusiness
  ) {
    super();
  }

  StationState = StationState;
  widths = [
    '12%',
    '10%',
    '9%',
    '9%',
    '8%',
    '9%',
    '7%',
    '7%',
    '8%',
    '7%',
    '7%',
    '7%',
  ];

  selected?: GarbageDropEventRecordViewModel;

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((args) => {
        this.args = args;
        this.loadData(1, this.pageSize);
      });
    }
    this.loadData(1, this.pageSize);
  }

  async loadData(index: number, size: number) {
    let promise = this.business.load(index, size, this.args);
    this.loading = true;
    promise
      .then((paged) => {
        this.page = paged.Page;
        this.datas = paged.Data;
        while (this.datas.length < this.page.PageSize) {
          this.datas.push(undefined);
        }
      })
      .finally(() => {
        this.loading = false;
      });
    return promise;
  }

  on = {
    page: (index: number) => {
      this.page.PageIndex = index;
      this.loadData(this.page.PageIndex, this.page.PageSize);
    },
    select: (item?: GarbageDropEventRecordViewModel) => {
      if (item) {
        if (this.selected === item) {
          this.selected = undefined;
        } else {
          this.selected = item;
        }
      }
    },
    image: (e: Event, item: GarbageDropEventRecordViewModel, index: number) => {
      let page = Page.create(index + 1);
      if (item.Data.HandleImageUrls) {
        page.PageSize += item.Data.HandleImageUrls.length;
        page.RecordCount = page.PageSize;
        page.TotalRecordCount = page.PageSize;
      }
      this.image.emit({
        page: page,
        data: item,
      });
      if (this.selected === item) {
        e.stopPropagation();
      }
    },
    video: {
      single: (e: Event, item?: GarbageDropEventRecordViewModel) => {
        if (item) {
          this.video.emit(item);
        }
        if (this.selected === item) {
          e.stopPropagation();
        }
      },
      all: (e: Event, item?: GarbageDropEventRecordViewModel) => {
        if (item) {
          this.videoall.emit(item);
        }
        if (this.selected === item) {
          e.stopPropagation();
        }
      },
    },
    complete: (e: Event, item?: GarbageDropEventRecordViewModel) => {
      if (item) {
        this.complete.emit(item);
      }
      if (this.selected === item) {
        e.stopPropagation();
      }
    },
    card: {
      record: (e: Event, item?: GarbageDropEventRecordViewModel) => {},
    },
    download: {
      video: (e: Event, item?: GarbageDropEventRecordViewModel) => {
        if (item && item.ResourceId) {
          this.business.download.video(
            item.Data.StationId,
            item.ResourceId,
            item.EventTime
          );
        }
        if (this.selected === item) {
          e.stopPropagation();
        }
      },
      image: (e: Event, item?: GarbageDropEventRecordViewModel) => {
        if (item && item.ImageUrl) {
          this.business.download.image(
            item.ImageUrl,
            item.ResourceName ?? item.Data.StationName,
            item.EventTime
          );
        }
        if (this.selected === item) {
          e.stopPropagation();
        }
      },
    },
  };
}
