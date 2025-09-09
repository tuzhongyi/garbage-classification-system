import { Injectable } from '@angular/core';
import { EventType } from '../../../../../common/enum/event-type.enum';
import { StationState } from '../../../../../common/enum/station-state.enum';
import { IasDevice } from '../../../../../common/network/model/ias/ias-device.model';
import { Flags } from '../../../../../common/tools/flags';
import { GarbageStationViewModel } from '../../../../../common/view-model/garbage-station.view-model';
import { GarbageManagementManagerBusiness } from '../../business/garbage-management-manager.business';
import { GarbageManagementManagerIndex } from '../../garbage-management-manager.model';
import { GarbageManagementManagerDataFilterController } from './garbage-management-manager-data-filter.controller';
import { GarbageManagementManagerDataLoaderController } from './garbage-management-manager-data-loader.controller';

@Injectable()
export class GarbageManagementManagerDataController {
  stations: GarbageStationViewModel[] = [];
  devices: IasDevice[] = [];
  source = {
    stations: [] as GarbageStationViewModel[],
  };
  eventables = [EventType.GarbageFull, EventType.GarbageDrop];
  constructor(business: GarbageManagementManagerBusiness) {
    this.loader = new GarbageManagementManagerDataLoaderController(business);
  }
  private loader: GarbageManagementManagerDataLoaderController;
  private filtration = new GarbageManagementManagerDataFilterController();
  load() {
    this.loader.station.load().then((x) => {
      this.stations = x;
      this.source.stations = x;
    });
    this.loader.device.load().then((x) => {
      this.devices = x;
    });
  }

  private filter = {
    data: {
      index: GarbageManagementManagerIndex.home,
      states: undefined as StationState[] | undefined,
    },
    station: {
      index: (
        datas: GarbageStationViewModel[],
        index: GarbageManagementManagerIndex
      ) => {
        switch (index) {
          case GarbageManagementManagerIndex.home:
            this.stations = datas;
            break;
          case GarbageManagementManagerIndex.mixedinto:
            this.stations = this.filtration.mixedinto(datas);
            break;
          case GarbageManagementManagerIndex.garbagedrop:
            this.stations = this.filtration.illegaldrop(datas);
            break;
          case GarbageManagementManagerIndex.vehicle:
            this.stations = this.filtration.illegalvehicle(datas);
            break;
          case GarbageManagementManagerIndex.street:
          default:
            this.stations = [];
            break;
        }
      },
      states: (
        datas: GarbageStationViewModel[],
        states: StationState[],
        eventables: EventType[]
      ) => {
        if (states.length == 0) {
          this.stations = [];
          return;
        }
        let _stations: GarbageStationViewModel[] = [];
        states.forEach((state) => {
          let filter = datas.filter((x) => {
            let result = false;
            let flags = new Flags(x.StationState);
            switch (state) {
              case StationState.Normal:
                result =
                  x.StationState === 0 &&
                  !(x.Statistic && x.Statistic.CurrentGarbageTime);
                break;
              case StationState.Full:
                if (eventables.includes(EventType.GarbageFull)) {
                  result = flags.contains(state);
                }
                break;
              case StationState.Error:
                result = flags.contains(state);
                break;
              case StationState.PanicButton:
                if (eventables.includes(EventType.GarbageDrop)) {
                  result = !!(x.Statistic && x.Statistic.CurrentGarbageTime);
                }
                break;
              default:
                return false;
            }
            return result;
          });
          _stations = [..._stations, ...filter];
          this.stations = [..._stations];
        });
      },
    },
    device: {
      index: (index: GarbageManagementManagerIndex) => {
        switch (index) {
          case GarbageManagementManagerIndex.home:

          case GarbageManagementManagerIndex.street:
            this.loader.device.load().then((x) => {
              this.devices = x;
            });
            break;
          case GarbageManagementManagerIndex.mixedinto:
          case GarbageManagementManagerIndex.garbagedrop:
          case GarbageManagementManagerIndex.vehicle:
          default:
            this.devices = [];
            break;
        }
      },
    },
    eventables: {
      index: (index: GarbageManagementManagerIndex) => {
        this.eventables = [EventType.GarbageFull, EventType.GarbageDrop];
        switch (index) {
          case GarbageManagementManagerIndex.mixedinto:
            this.eventables = [EventType.GarbageFull];
            break;
          case GarbageManagementManagerIndex.garbagedrop:
            this.eventables = [EventType.GarbageDrop];
            break;
          case GarbageManagementManagerIndex.home:
          case GarbageManagementManagerIndex.vehicle:
          case GarbageManagementManagerIndex.street:
            break;
          default:
            break;
        }
      },
    },
  };

  on = {
    index: (index: GarbageManagementManagerIndex) => {
      this.filter.data.index = index;
      this.filter.eventables.index(index);
      this.filter.device.index(index);
      this.filter.station.index(this.source.stations, index);
      if (this.filter.data.states) {
        this.filter.station.states(
          this.stations,
          this.filter.data.states,
          this.eventables
        );
      }
    },
    state: (states: StationState[]) => {
      this.filter.data.states = states;
      if (states.length == 0) {
        this.stations = [];
        return;
      }
      this.on.index(this.filter.data.index);
    },
  };
}
