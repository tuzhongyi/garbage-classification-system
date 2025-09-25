import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginatorComponent } from '../../../../../../common/components/paginator/paginator.component';
import { IasEventRecord } from '../../../../../../common/network/model/ias/ias-event-record.model';
import { PagedArgs } from '../../../../../../common/network/model/model.interface';
import { Page } from '../../../../../../common/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../../../../../../common/tools/component-tool/table-abstract.component';
import { GarbageManagementRecordEventIasListTableBusiness } from './business/garbage-management-record-event-ias-list-table.business';
import {
  GarbageManagementRecordEventIasListTableArgs,
  GarbageManagementRecordEventIasListTableItem,
} from './business/garbage-management-record-event-ias-list-table.model';

@Component({
  selector: 'howell-garbage-management-record-event-ias-list-table',
  imports: [CommonModule, PaginatorComponent],
  templateUrl:
    './garbage-management-record-event-ias-list-table.component.html',
  styleUrl: './garbage-management-record-event-ias-list-table.component.less',
  providers: [GarbageManagementRecordEventIasListTableBusiness],
})
export class GarbageManagementRecordEventIasListTableComponent
  extends PagedTableAbstractComponent<GarbageManagementRecordEventIasListTableItem>
  implements OnInit, OnDestroy
{
  @Input() args = new GarbageManagementRecordEventIasListTableArgs();
  @Input() load?: EventEmitter<GarbageManagementRecordEventIasListTableArgs>;

  @Output() image = new EventEmitter<PagedArgs<IasEventRecord>>();
  @Output() position = new EventEmitter<IasEventRecord>();
  @Output() task = new EventEmitter<IasEventRecord>();

  constructor(
    private business: GarbageManagementRecordEventIasListTableBusiness
  ) {
    super();
  }

  widths = ['10%', '10%', '12%', '15%', '10%', '10%', '10%', '15%', '8%'];

  selected?: GarbageManagementRecordEventIasListTableItem;
  private subscription = new Subscription();
  private regist() {
    if (this.load) {
      this.load.subscribe((x) => {
        this.args = x;
        this.loadData(
          this.args.first ? 1 : this.page.PageIndex,
          this.page.PageSize
        );
      });
    }
  }

  ngOnInit(): void {
    this.regist();
    this.loadData(1, this.pageSize);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  picture = {
    get: (url: string) => {
      return this.business.picture(url);
    },
    on: (
      e: Event,
      item: GarbageManagementRecordEventIasListTableItem,
      index: number
    ) => {
      if (this.selected === item) {
        e.stopImmediatePropagation();
      }

      let count = item.Resources?.length ?? 0;
      let page = new Page();
      page.PageIndex = index + 1;
      page.PageSize = count;
      page.RecordCount = count;
      page.TotalRecordCount = count;
      page.PageCount = 1;

      let paged: PagedArgs = {
        page: page,
        data: item,
      };

      this.image.emit(paged);
    },
  };

  on = {
    page: (index: number) => {
      this.page.PageIndex = index;
      this.loadData(this.page.PageIndex, this.page.PageSize);
    },
    select: (item?: GarbageManagementRecordEventIasListTableItem) => {
      if (item) {
        if (this.selected === item) {
          this.selected = undefined;
        } else {
          this.selected = item;
        }
      }
    },
    position: (item: GarbageManagementRecordEventIasListTableItem) => {
      this.position.emit(item);
    },
    task: (item: GarbageManagementRecordEventIasListTableItem) => {
      this.task.emit(item);
    },
  };
}
