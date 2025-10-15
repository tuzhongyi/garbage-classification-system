import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HowellSelectComponent } from '../../../../../../common/components/select/hw-select/select-control.component';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { Vehicle } from '../../../../../../common/network/model/garbage-station/vehicle/vehicle.model';
import { PagedArgs } from '../../../../../../common/network/model/model.interface';
import { PagedList } from '../../../../../../common/network/model/page_list.model';
import { CameraImageUrl } from '../../../../../../common/network/model/url-model/camera-image-url.model';
import { SelectDivisionComponent } from '../../../../../share/select/select-division/select-division.component';
import { HowellWindowComponent } from '../../../../../share/window/window.component';
import { GarbageManagementVehicleDetailsComponent } from '../garbage-management-vehicle-details/garbage-management-vehicle-details.component';
import { GarbageManagementVehicleListTableComponent } from '../garbage-management-vehicle-list-table/garbage-management-vehicle-list-table.component';
import { GarbageManagementVehicleListTableArgs } from '../garbage-management-vehicle-list-table/garbage-management-vehicle-list-table.model';
import { GarbageManagementVehicleListManagerBusiness } from './garbage-management-vehicle-list-manager.business';
import { GarbageManagementVehicleListManagerSource } from './garbage-management-vehicle-list-manager.source';
import { GarbageManagementVehicleListManagerWindow } from './garbage-management-vehicle-list-manager.window';

@Component({
  selector: 'howell-garbage-management-vehicle-list-manager',
  imports: [
    CommonModule,
    FormsModule,
    SelectDivisionComponent,
    HowellSelectComponent,
    GarbageManagementVehicleListTableComponent,
    WindowConfirmComponent,
    HowellWindowComponent,
    GarbageManagementVehicleDetailsComponent,
  ],
  templateUrl: './garbage-management-vehicle-list-manager.component.html',
  styleUrl: './garbage-management-vehicle-list-manager.component.less',
  providers: [GarbageManagementVehicleListManagerBusiness],
})
export class GarbageManagementVehicleListManagerComponent {
  @Output() image = new EventEmitter<PagedList<CameraImageUrl>>();
  constructor(
    private business: GarbageManagementVehicleListManagerBusiness,
    private toastr: ToastrService
  ) {}
  source = new GarbageManagementVehicleListManagerSource();
  window = new GarbageManagementVehicleListManagerWindow();
  table = {
    args: new GarbageManagementVehicleListTableArgs(),
    load: new EventEmitter<GarbageManagementVehicleListTableArgs>(),
  };

  on = {
    search: () => {
      this.table.load.emit(this.table.args);
    },

    image: (data: PagedArgs<Vehicle>) => {
      let images: CameraImageUrl[] = [];
      if (data.data.VehicleImageUrl) {
        let url = new CameraImageUrl();
        url.CameraName = data.data.PlateNo;
        url.ImageUrl = data.data.VehicleImageUrl;
        images.push(url);
      }
      if (data.data.PlateImageUrl) {
        let url = new CameraImageUrl();
        url.CameraName = data.data.PlateNo;
        url.ImageUrl = data.data.PlateImageUrl;
        images.push(url);
      }
      let paged = PagedList.create(images, data.page.PageIndex, 1);

      this.image.emit(paged);
    },
    details: {
      open: (data: Vehicle) => {
        this.window.details.open(data);
      },
      save: (data: Vehicle) => {
        this.business
          .update(data)
          .then((x) => {
            this.toastr.success('修改成功');
            this.table.args.first = false;
            this.table.load.emit(this.table.args);
            this.window.details.show = false;
          })
          .catch((e) => {
            this.toastr.error('修改失败');
          });
      },
    },

    delete: {
      confirm: (data: Vehicle) => {
        this.window.confirm.data = data;
        this.window.confirm.show = true;
      },
      do: () => {
        if (this.window.confirm.data) {
          this.business
            .delete(this.window.confirm.data.Id)
            .then((x) => {
              this.toastr.success('删除成功');
              this.table.args.first = false;
              this.table.load.emit(this.table.args);
              this.window.confirm.show = false;
            })
            .catch((e) => {
              this.toastr.error('删除失败');
            });
        }
      },
    },
  };
}
