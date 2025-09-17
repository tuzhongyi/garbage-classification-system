import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorComponent } from '../../../../../../common/components/paginator/paginator.component';
import { ImageDirective } from '../../../../../../common/directives/image/image.directive';
import { StationState } from '../../../../../../common/enum/station-state.enum';
import { GarbageStation } from '../../../../../../common/network/model/garbage-station/garbage-station.model';
import { PagedArgs } from '../../../../../../common/network/model/model.interface';
import { Page } from '../../../../../../common/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../../../../../../common/tools/component-tool/table-abstract.component';
import { GarbageStationTableBusiness } from './business/garbage-station-table.business';
import { GarbageStationTableConverter } from './business/garbage-station-table.converter';
import {
  GarbageStationTableArgs,
  GarbageStationTableModel,
} from './business/garbage-station-table.model';

@Component({
  selector: 'howell-garbage-management-station-list-table',
  imports: [CommonModule, PaginatorComponent, ImageDirective],
  templateUrl: './garbage-management-station-list-table.component.html',
  styleUrl: './garbage-management-station-list-table.component.less',
  providers: [GarbageStationTableBusiness, GarbageStationTableConverter],
})
export class GarbageManagementStationListTableComponent
  extends PagedTableAbstractComponent<GarbageStationTableModel>
  implements OnInit
{
  @Input() load?: EventEmitter<GarbageStationTableArgs>;
  @Input() isoperation = true;
  @Input() args = new GarbageStationTableArgs();
  @Output() image: EventEmitter<PagedArgs<GarbageStation>> = new EventEmitter();
  @Output() position: EventEmitter<GarbageStation> = new EventEmitter();

  constructor(private business: GarbageStationTableBusiness) {
    super();
  }

  StationState = StationState;
  widths = ['20%', '15%'];

  selected?: GarbageStationTableModel;

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
    image: (e: Event, item: GarbageStationTableModel, index: number) => {
      this.image.emit({
        page: Page.create(index),
        data: item.GarbageStation,
      });
      if (this.selected === item) {
        e.stopPropagation();
      }
    },
    select: (item?: GarbageStationTableModel) => {
      if (item) {
        if (this.selected === item) {
          this.selected = undefined;
        } else {
          this.selected = item;
        }
      }
    },
    position: (item?: GarbageStationTableModel) => {
      if (item) {
        this.position.emit(item.GarbageStation);
      }
    },
  };
}
