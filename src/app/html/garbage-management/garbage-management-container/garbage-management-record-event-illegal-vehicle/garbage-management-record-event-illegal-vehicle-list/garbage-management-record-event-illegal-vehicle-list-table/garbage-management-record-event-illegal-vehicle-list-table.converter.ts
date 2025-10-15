import { Injectable } from '@angular/core';
import { IllegalVehicleEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/illegal-vehicle-event-record.model';
import { DivisionRequestService } from '../../../../../../common/network/request/garbage/division/division-request.service';
import { EventRequestService } from '../../../../../../common/network/request/garbage/event/event-request.service';
import { GarbageStationRequestService } from '../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';
import { VehicleRequestService } from '../../../../../../common/network/request/garbage/vehicle/vehicle-request.service';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';
import { DivisionViewModelConverter } from '../../../../../../common/view-model/division.view-model';
import { IllegalVehicleEventRecordViewModel } from './garbage-management-record-event-illegal-vehicle-list-table.model';

@Injectable()
export class GarbageManagementRecordEventIllegalVehicleListTableConverter {
  constructor(
    event: EventRequestService,
    station: GarbageStationRequestService,
    division: DivisionRequestService,
    vehicle: VehicleRequestService,
    converter: DivisionViewModelConverter
  ) {
    this.service = { event, station, division, vehicle };
    this.converter = { division: converter };
  }

  converter: {
    division: DivisionViewModelConverter;
  };

  private service: {
    event: EventRequestService;
    station: GarbageStationRequestService;
    division: DivisionRequestService;
    vehicle: VehicleRequestService;
  };

  convert(data: IllegalVehicleEventRecord) {
    let vm = new IllegalVehicleEventRecordViewModel();
    vm = Object.assign(vm, data);
    vm.GarbageStation = this.service.station.cache.get(data.Data.StationId);
    if (vm.Data.DivisionId) {
      vm.Division = this.service.division.cache
        .get(vm.Data.DivisionId)
        .then((division) => {
          return this.converter.division.convert(division);
        });
    }

    vm.images = ObjectTool.model.record.illegalvehicle.images(data);

    return vm;
  }
}
