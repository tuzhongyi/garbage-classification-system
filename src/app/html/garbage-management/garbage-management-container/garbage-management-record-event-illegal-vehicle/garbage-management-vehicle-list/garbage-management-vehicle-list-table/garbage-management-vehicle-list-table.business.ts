import { Injectable } from '@angular/core';
import { PagedList } from '../../../../../../common/network/model/page_list.model';
import { GetVehiclesParams } from '../../../../../../common/network/request/garbage/vehicle/vehicle-request.params';
import { VehicleRequestService } from '../../../../../../common/network/request/garbage/vehicle/vehicle-request.service';
import {
  VehicleViewModel,
  VehicleViewModelConverter,
} from '../../../../../../common/view-model/vehicle.view-model';
import { GarbageManagementVehicleListTableArgs } from './garbage-management-vehicle-list-table.model';

@Injectable()
export class GarbageManagementVehicleListTableBusiness {
  constructor(
    private service: VehicleRequestService,
    private converter: VehicleViewModelConverter
  ) {}

  async load(
    index: number,
    size: number,
    args: GarbageManagementVehicleListTableArgs
  ) {
    let data = await this.data.load(index, size, args);
    let paged = new PagedList<VehicleViewModel>();
    paged.Page = data.Page;
    paged.Data = data.Data.map((x) => this.converter.convert(x));
    return paged;
  }

  private data = {
    load: (
      index: number,
      size: number,
      args: GarbageManagementVehicleListTableArgs
    ) => {
      let params = new GetVehiclesParams();
      params.PageIndex = index;
      params.PageSize = size;
      if (args.plate) {
        params.PlateNo = args.plate;
      }
      if (args.color != undefined) {
        params.PlateColor = args.color;
      }
      if (args.type != undefined) {
        params.VehicleType = args.type;
      }
      if (args.divisionId) {
        params.DivisionId = args.divisionId;
      }
      return this.service.list(params);
    },
  };
}
