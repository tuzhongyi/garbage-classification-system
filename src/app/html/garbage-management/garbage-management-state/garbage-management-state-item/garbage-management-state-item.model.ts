export class GarbageManagementStateItem {
  name: string = '';
  value: number = 0;
  color = GarbageManagementStateItemColor.green;
  show = true;
}
export enum GarbageManagementStateItemColor {
  green = 'green',
  yellow = 'yellow',
  gray = 'gray',
  cyan = 'cyan',
  purple = 'purple',
}
