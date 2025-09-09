import { StationState } from '../../../../common/enum/station-state.enum';

export class GarbageManagementStateItem {
  name: string = '';
  value: number = 0;
  color = GarbageManagementStateItemColor.green;
  show = true;
  state = StationState.Normal;
}
export enum GarbageManagementStateItemColor {
  green = 'green',
  yellow = 'yellow',
  gray = 'gray',
  cyan = 'cyan',
  purple = 'purple',
}
