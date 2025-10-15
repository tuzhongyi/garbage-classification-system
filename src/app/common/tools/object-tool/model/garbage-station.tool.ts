import { StationType } from '../../../enum/station-type.enum';

export class GarbageStationTool {
  get types() {
    return [
      StationType.Garbage,
      StationType.Smart,
      StationType.Plus,
      StationType.IllegalDump,
      StationType.IllegalVehicle,
    ];
  }
}
