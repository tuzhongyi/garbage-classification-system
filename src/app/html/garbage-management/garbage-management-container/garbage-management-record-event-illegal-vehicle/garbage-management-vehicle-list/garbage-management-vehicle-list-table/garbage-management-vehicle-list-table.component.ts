import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorComponent } from '../../../../../../common/components/paginator/paginator.component';
import { ImageDirective } from '../../../../../../common/directives/image/image.directive';
import { Vehicle } from '../../../../../../common/network/model/garbage-station/vehicle/vehicle.model';
import { PagedArgs } from '../../../../../../common/network/model/model.interface';
import { Page } from '../../../../../../common/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../../../../../../common/tools/component-tool/table-abstract.component';
import { VehicleViewModel } from '../../../../../../common/view-model/vehicle.view-model';
import { GarbageManagementVehicleListTableBusiness } from './garbage-management-vehicle-list-table.business';
import { GarbageManagementVehicleListTableArgs } from './garbage-management-vehicle-list-table.model';

@Component({
  selector: 'howell-garbage-management-vehicle-list-table',
  imports: [CommonModule, PaginatorComponent, ImageDirective],
  templateUrl: './garbage-management-vehicle-list-table.component.html',
  styleUrl: './garbage-management-vehicle-list-table.component.less',
  providers: [GarbageManagementVehicleListTableBusiness],
})
export class GarbageManagementVehicleListTableComponent
  extends PagedTableAbstractComponent<VehicleViewModel>
  implements OnInit
{
  @Input() load?: EventEmitter<GarbageManagementVehicleListTableArgs>;
  @Input() args = new GarbageManagementVehicleListTableArgs();

  @Output() image = new EventEmitter<PagedArgs<Vehicle>>();
  @Output() edit = new EventEmitter<Vehicle>();
  @Output() delete = new EventEmitter<Vehicle>();

  constructor(private business: GarbageManagementVehicleListTableBusiness) {
    super();
  }

  widths = ['13%', '13%', '13%', '13%', '15%', '23%', '10%'];

  selected?: VehicleViewModel;

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((args) => {
        this.args = args;
        let index = this.page.PageIndex;
        if (args.first) {
          index = 1;
        }
        this.loadData(index, this.pageSize);
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
    select: (item?: VehicleViewModel) => {
      if (item) {
        if (this.selected === item) {
          this.selected = undefined;
        } else {
          this.selected = item;
        }
      }
    },
    image: (e: Event, item: VehicleViewModel, index: number) => {
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
    edit: (e: Event, item: VehicleViewModel) => {
      this.edit.emit(item);
      if (this.selected === item) {
        e.stopPropagation();
      }
    },
    delete: (e: Event, item: VehicleViewModel) => {
      this.delete.emit(item);
      if (this.selected === item) {
        e.stopPropagation();
      }
    },
  };
}
