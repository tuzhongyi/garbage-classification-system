import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorComponent } from '../../../../../../common/components/paginator/paginator.component';
import { ImageDirective } from '../../../../../../common/directives/image/image.directive';
import { StationState } from '../../../../../../common/enum/station-state.enum';
import { IllegalVehicleEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/illegal-vehicle-event-record.model';
import { PagedArgs } from '../../../../../../common/network/model/model.interface';
import { Page } from '../../../../../../common/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../../../../../../common/tools/component-tool/table-abstract.component';
import { GarbageManagementRecordEventGarbageDropListTableArgs } from '../../../garbage-management-record-event-garbage-drop/garbage-management-record-event-garbage-drop-list/garbage-management-record-event-garbage-drop-list-table/garbage-management-record-event-garbage-drop-list-table.model';
import { GarbageManagementRecordEventIllegalVehicleListTableBusiness } from './garbage-management-record-event-illegal-vehicle-list-table.business';
import { GarbageManagementRecordEventIllegalVehicleListTableConverter } from './garbage-management-record-event-illegal-vehicle-list-table.converter';
import { IllegalVehicleEventRecordViewModel } from './garbage-management-record-event-illegal-vehicle-list-table.model';

@Component({
  selector: 'howell-garbage-management-record-event-illegal-vehicle-list-table',
  imports: [CommonModule, PaginatorComponent, ImageDirective],
  templateUrl:
    './garbage-management-record-event-illegal-vehicle-list-table.component.html',
  styleUrl:
    './garbage-management-record-event-illegal-vehicle-list-table.component.less',
  providers: [
    GarbageManagementRecordEventIllegalVehicleListTableConverter,
    GarbageManagementRecordEventIllegalVehicleListTableBusiness,
  ],
})
export class GarbageManagementRecordEventIllegalVehicleListTableComponent
  extends PagedTableAbstractComponent<IllegalVehicleEventRecordViewModel>
  implements OnInit
{
  @Input()
  load?: EventEmitter<GarbageManagementRecordEventGarbageDropListTableArgs>;
  @Input() args = new GarbageManagementRecordEventGarbageDropListTableArgs();

  @Output() image = new EventEmitter<PagedArgs<IllegalVehicleEventRecord>>();
  @Output() video = new EventEmitter<IllegalVehicleEventRecord>();
  @Output() videoall = new EventEmitter<IllegalVehicleEventRecord>();
  @Output() complete = new EventEmitter<IllegalVehicleEventRecord>();
  @Output() enable = new EventEmitter<IllegalVehicleEventRecord>();

  constructor(
    private business: GarbageManagementRecordEventIllegalVehicleListTableBusiness
  ) {
    super();
  }

  StationState = StationState;
  widths = [
    '10%',
    '8%',
    '6%',
    '7%',
    '14%',
    '10%',
    '12%',
    '7%',
    '7%',
    '5%',
    '6%',
    '8%',
  ];

  selected?: IllegalVehicleEventRecordViewModel;

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
    select: (item?: IllegalVehicleEventRecordViewModel) => {
      if (item) {
        if (this.selected === item) {
          this.selected = undefined;
        } else {
          this.selected = item;
        }
      }
    },
    image: (
      e: Event,
      item: IllegalVehicleEventRecordViewModel,
      index: number
    ) => {
      let page = Page.create(index + 1);
      page.PageSize = item.images.length;

      page.RecordCount = page.PageSize;
      page.TotalRecordCount = page.PageSize;

      this.image.emit({
        page: page,
        data: item,
      });
      if (this.selected === item) {
        e.stopPropagation();
      }
    },
    video: {
      single: (e: Event, item?: IllegalVehicleEventRecordViewModel) => {
        if (item) {
          this.video.emit(item);
        }
        if (this.selected === item) {
          e.stopPropagation();
        }
      },
      all: (e: Event, item?: IllegalVehicleEventRecordViewModel) => {
        if (item) {
          this.videoall.emit(item);
        }
        if (this.selected === item) {
          e.stopPropagation();
        }
      },
    },
    complete: (e: Event, item?: IllegalVehicleEventRecordViewModel) => {
      if (item) {
        this.complete.emit(item);
      }
      if (this.selected === item) {
        e.stopPropagation();
      }
    },
    enable: (e: Event, item?: IllegalVehicleEventRecordViewModel) => {
      if (item) {
        this.enable.emit(item);
      }
      if (this.selected === item) {
        e.stopPropagation();
      }
    },
    download: {
      video: (e: Event, item?: IllegalVehicleEventRecordViewModel) => {
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
      image: (e: Event, item?: IllegalVehicleEventRecord) => {
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
