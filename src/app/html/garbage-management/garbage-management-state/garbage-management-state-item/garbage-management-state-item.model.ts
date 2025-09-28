export class GarbageManagementStateItem {
  name: string = '';
  value: number = 0;
  color = GarbageManagementStateItemColor.green;
  show = true;
}
export enum GarbageManagementStateItemColor {
  green = 'text-green',
  yellow = 'text-yellow',
  gray = 'text-gray',
  cyan = 'text-cyan',
  orange = 'text-orange',
}
