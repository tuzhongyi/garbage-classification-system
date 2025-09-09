import { CameraUsage } from '../enum/camera-usage.enum';
import { EventType } from '../enum/event-type.enum';
import { StationType } from '../enum/station-type.enum';
import { GarbageStationNumberStatistic } from '../network/model/garbage-station/garbage-station-number-statistic.model';
import { GarbageStation } from '../network/model/garbage-station/garbage-station.model';
import { Flags } from '../tools/flags';

export class GarbageStationViewModel extends GarbageStation {
  Statistic?: GarbageStationNumberStatistic;
  private _eventables?: EventType[];
  get Eventables(): EventType[] {
    if (this._eventables) {
      return this._eventables;
    }
    let events = [];

    if (this.Cameras) {
      for (let i = 0; i < this.Cameras.length; i++) {
        const camera = this.Cameras[i];
        let flags = new Flags(camera.CameraUsage);
        if (
          flags.contains(CameraUsage.GarbageFull) ||
          flags.contains(CameraUsage.MixedInto)
        ) {
          events.push(EventType.GarbageFull);
          events.push(EventType.MixedInto);
        }
      }
    }
    if (this.StationType === StationType.GarbageDrop) {
      events.push(EventType.GarbageDrop);
      events.push(EventType.IllegalDrop);
    }

    if (this.StationType === StationType.Construction) {
      events.push(EventType.GarbageFull);
      events.push(EventType.ConstructionData);
    }
    if (this.StationType === StationType.VehicleWatching) {
      events.push(EventType.IllegalVehicle);
    }

    this._eventables = Array.from(new Set(events));

    if (this._eventables.length === 0) {
      this._eventables = [EventType.IllegalDrop];
    }

    return this._eventables;
  }
}
