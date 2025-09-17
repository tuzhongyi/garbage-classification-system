import { StationState } from '../../../../../../../common/enum/station-state.enum';
import { StationType } from '../../../../../../../common/enum/station-type.enum';
import { GarbageStation } from '../../../../../../../common/network/model/garbage-station/garbage-station.model';
import { DivisionViewModel } from '../../../../../../../common/view-model/division.view-model';

export class GarbageStationTableModel {
  GarbageStation!: GarbageStation;
  Division?: Promise<DivisionViewModel>;
  states: StationState[] = [];
  urls!: Promise<string[]>;
}
export class GarbageStationTableArgs {
  stationId?: string;
  divisionId?: string;
  state?: number;
  type?: StationType;
  stationName?: string;
  communityName?: string;
}
