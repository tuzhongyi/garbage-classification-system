import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorComponent } from '../../../../../../common/components/paginator/paginator.component';
import { ImageDirective } from '../../../../../../common/directives/image/image.directive';
import { StationState } from '../../../../../../common/enum/station-state.enum';
import { IllegalDropEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { PagedArgs } from '../../../../../../common/network/model/model.interface';
import { Page } from '../../../../../../common/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../../../../../../common/tools/component-tool/table-abstract.component';
import { GarbageManagementRecordEventIllegalDumpListTableBusiness } from './garbage-management-record-event-illegal-dump-list-table.business';
import {
  GarbageManagementRecordEventIllegalDumpListTableArgs,
  IllegalDumpEventRecordViewModel,
} from './garbage-management-record-event-illegal-dump-list-table.model';

@Component({
  selector: 'howell-garbage-management-record-event-illegal-dump-list-table',
  imports: [CommonModule, PaginatorComponent, ImageDirective],
  templateUrl:
    './garbage-management-record-event-illegal-dump-list-table.component.html',
  styleUrl:
    './garbage-management-record-event-illegal-dump-list-table.component.less',
  providers: [GarbageManagementRecordEventIllegalDumpListTableBusiness],
})
export class GarbageManagementRecordEventIllegalDumpListTableComponent
  extends PagedTableAbstractComponent<IllegalDumpEventRecordViewModel>
  implements OnInit
{
  @Input()
  load?: EventEmitter<GarbageManagementRecordEventIllegalDumpListTableArgs>;
  @Input() args = new GarbageManagementRecordEventIllegalDumpListTableArgs();

  @Output() image = new EventEmitter<PagedArgs<IllegalDropEventRecord>>();
  @Output() video = new EventEmitter<IllegalDropEventRecord>();

  constructor(
    private business: GarbageManagementRecordEventIllegalDumpListTableBusiness
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

  selected?: IllegalDumpEventRecordViewModel;

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((args) => {
        this.args = args;
        this.loadData(1, this.pageSize);
      });
    }
    this.loadData(-1, this.pageSize);
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
    select: (item?: IllegalDumpEventRecordViewModel) => {
      if (item) {
        if (this.selected === item) {
          this.selected = undefined;
        } else {
          this.selected = item;
        }
      }
    },
    image: (e: Event, item: IllegalDumpEventRecordViewModel, index: number) => {
      this.image.emit({
        page: Page.create(index + 1),
        data: item,
      });
      if (this.selected === item) {
        e.stopPropagation();
      }
    },
    video: (e: Event, item?: IllegalDumpEventRecordViewModel) => {
      if (item) {
        this.video.emit(item);
      }
      if (this.selected === item) {
        e.stopPropagation();
      }
    },
    download: {
      video: (e: Event, item?: IllegalDumpEventRecordViewModel) => {
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
      image: (e: Event, item?: IllegalDumpEventRecordViewModel) => {
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
