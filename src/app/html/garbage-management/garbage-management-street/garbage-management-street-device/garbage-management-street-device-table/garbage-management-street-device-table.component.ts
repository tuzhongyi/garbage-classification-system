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
import { PaginatorComponent } from '../../../../../common/components/paginator/paginator.component';
import { IasDevice } from '../../../../../common/network/model/ias/ias-device.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { PagedTableAbstractComponent } from '../../../../../common/tools/component-tool/table-abstract.component';
import { GarbageManagementStreetDeviceTableBusiness } from './business/garbage-management-street-device-table.business';
import { GarbageManagementStreetDeviceTableArgs } from './business/garbage-management-street-device-table.model';

@Component({
  selector: 'howell-garbage-management-street-device-table',
  imports: [CommonModule, PaginatorComponent],
  templateUrl: './garbage-management-street-device-table.component.html',
  styleUrl: './garbage-management-street-device-table.component.less',
  providers: [GarbageManagementStreetDeviceTableBusiness],
})
export class GarbageManagementStreetDeviceTableComponent
  extends PagedTableAbstractComponent<IasDevice>
  implements OnInit, OnDestroy
{
  @Input() load?: EventEmitter<GarbageManagementStreetDeviceTableArgs>;
  @Input() isoperation = true;
  @Input() args = new GarbageManagementStreetDeviceTableArgs();
  @Output() image: EventEmitter<PagedArgs<IasDevice>> = new EventEmitter();
  @Output() position: EventEmitter<IasDevice> = new EventEmitter();

  constructor(private business: GarbageManagementStreetDeviceTableBusiness) {
    super();
  }

  widths = ['5%', 'auto', '15%', '10%', '250px', '10%', '10%', '10%'];

  selected?: IasDevice;
  private subscription = new Subscription();
  private regist() {
    if (this.load) {
      this.load.subscribe((x) => {
        this.args = x;
        this.loadData(1, this.page.PageSize);
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

  on = {
    page: (index: number) => {
      this.page.PageIndex = index;
      this.loadData(this.page.PageIndex, this.page.PageSize);
    },
    select: (item?: IasDevice) => {
      if (item) {
        if (this.selected === item) {
          this.selected = undefined;
        } else {
          this.selected = item;
        }
      }
    },
    position: (item: IasDevice) => {},
  };
}
