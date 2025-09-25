import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorComponent } from '../../../../../../common/components/paginator/paginator.component';
import { ImageDirective } from '../../../../../../common/directives/image/image.directive';
import { StationState } from '../../../../../../common/enum/station-state.enum';
import { IllegalDropEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { PagedArgs } from '../../../../../../common/network/model/model.interface';
import { Page } from '../../../../../../common/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../../../../../../common/tools/component-tool/table-abstract.component';
import { GarbageManagementRecordEventIllegalDropListTableBusiness } from './garbage-management-record-event-illegal-drop-list-table.business';
import {
  GarbageManagementRecordEventIllegalDropListTableArgs,
  IllegalDropEventRecordViewModel,
} from './garbage-management-record-event-illegal-drop-list-table.model';

@Component({
  selector: 'howell-garbage-management-record-event-illegal-drop-list-table',
  imports: [CommonModule, PaginatorComponent, ImageDirective],
  templateUrl:
    './garbage-management-record-event-illegal-drop-list-table.component.html',
  styleUrl:
    './garbage-management-record-event-illegal-drop-list-table.component.less',
  providers: [GarbageManagementRecordEventIllegalDropListTableBusiness],
})
export class GarbageManagementRecordEventIllegalDropListTableComponent
  extends PagedTableAbstractComponent<IllegalDropEventRecordViewModel>
  implements OnInit
{
  @Input()
  load?: EventEmitter<GarbageManagementRecordEventIllegalDropListTableArgs>;
  @Input() args = new GarbageManagementRecordEventIllegalDropListTableArgs();

  @Output() image = new EventEmitter<PagedArgs<IllegalDropEventRecord>>();
  @Output() video = new EventEmitter<IllegalDropEventRecord>();

  constructor(
    private business: GarbageManagementRecordEventIllegalDropListTableBusiness
  ) {
    super();
  }

  StationState = StationState;
  widths = [
    '150px',
    undefined,
    undefined,
    '13%',
    '10%',
    '12%',
    '210px',
    '150px',
  ];

  selected?: IllegalDropEventRecordViewModel;

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
    select: (item?: IllegalDropEventRecordViewModel) => {
      if (item) {
        if (this.selected === item) {
          this.selected = undefined;
        } else {
          this.selected = item;
        }
      }
    },
    image: (e: Event, item: IllegalDropEventRecordViewModel, index: number) => {
      this.image.emit({
        page: Page.create(index),
        data: item,
      });
      if (this.selected === item) {
        e.stopPropagation();
      }
    },
    video: (e: Event, item?: IllegalDropEventRecordViewModel) => {
      if (item) {
        this.video.emit(item);
      }
      if (this.selected === item) {
        e.stopPropagation();
      }
    },
    download: {
      video: (e: Event, item?: IllegalDropEventRecordViewModel) => {
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
      image: (e: Event, item?: IllegalDropEventRecordViewModel) => {
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
