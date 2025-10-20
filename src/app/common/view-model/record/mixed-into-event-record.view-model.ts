import { Injectable } from '@angular/core';
import { StationState } from '../../enum/station-state.enum';
import { MixedIntoEventRecord } from '../../network/model/garbage-station/event-record/mixed-into-event-record.model';
import { GarbageStation } from '../../network/model/garbage-station/garbage-station.model';
import { DivisionRequestService } from '../../network/request/garbage/division/division-request.service';
import { GarbageStationRequestService } from '../../network/request/garbage/garbage-station/garbage-station-request.service';
import {
  DivisionViewModel,
  DivisionViewModelConverter,
} from '../division.view-model';

export class MixedIntoEventRecordViewModel extends MixedIntoEventRecord {
  images: string[] = [];
  states!: Promise<StationState[]>;
  GarbageStation!: Promise<GarbageStation>;
  Division?: Promise<DivisionViewModel>;
}

@Injectable({
  providedIn: 'root',
})
export class MixedIntoEventRecordViewModelConverter {
  constructor(
    station: GarbageStationRequestService,
    division: DivisionRequestService,
    converter: DivisionViewModelConverter
  ) {
    this.service = { station, division };
    this.converter = { division: converter };
  }

  private converter: {
    division: DivisionViewModelConverter;
  };

  private service: {
    station: GarbageStationRequestService;
    division: DivisionRequestService;
  };

  convert(data: MixedIntoEventRecord) {
    let vm = new MixedIntoEventRecordViewModel();
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

    if (data.Data.HandleImageUrl) {
      vm.images.push(data.Data.HandleImageUrl);
    }

    return vm;
  }
}
