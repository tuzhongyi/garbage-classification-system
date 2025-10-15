import { Injectable } from '@angular/core';
import { StationState } from '../../enum/station-state.enum';
import { IllegalDropEventRecord } from '../../network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { GarbageStation } from '../../network/model/garbage-station/garbage-station.model';
import { DivisionRequestService } from '../../network/request/garbage/division/division-request.service';
import { GarbageStationRequestService } from '../../network/request/garbage/garbage-station/garbage-station-request.service';
import {
  DivisionViewModel,
  DivisionViewModelConverter,
} from '../division.view-model';

export class IllegalDropEventRecordViewModel extends IllegalDropEventRecord {
  images: string[] = [];
  states: StationState[] = [];
  GarbageStation!: Promise<GarbageStation>;
  Division?: Promise<DivisionViewModel>;
}

@Injectable({
  providedIn: 'root',
})
export class IllegalDropEventRecordViewModelConverter {
  constructor(
    station: GarbageStationRequestService,
    division: DivisionRequestService,
    converter: DivisionViewModelConverter
  ) {
    this.service = { station, division };
    this.converter = { division: converter };
  }
  converter: {
    division: DivisionViewModelConverter;
  };

  private service: {
    station: GarbageStationRequestService;
    division: DivisionRequestService;
  };

  convert(data: IllegalDropEventRecord) {
    let vm = new IllegalDropEventRecordViewModel();
    vm = Object.assign(vm, data);
    vm.GarbageStation = this.service.station.cache.get(data.Data.StationId);
    if (vm.Data.DivisionId) {
      vm.Division = this.service.division.cache
        .get(vm.Data.DivisionId)
        .then((division) => {
          return this.converter.division.convert(division);
        });
    }

    vm.images = data.ImageUrl ? [data.ImageUrl] : [];

    return vm;
  }
}
