import { StationState } from '../../../../common/enum/station-state.enum';
import { GarbageManagementStateItem } from '../garbage-management-state-item/garbage-management-state-item.model';

export class GarbageManagementStationStateItem extends GarbageManagementStateItem {
  state = StationState.Normal;
}
