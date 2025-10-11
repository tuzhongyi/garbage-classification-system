export class GarbageManagementStatisticStationItem {
  icon = GarbageManagementStatisticRecordIcon.illegaldump;
  value = 0;
  name = '';
  show = true;
}
export enum GarbageManagementStatisticRecordIcon {
  garbagestation = 'garbagestation',
  illegaldump = 'illegaldump',
  illegalvehicle = 'illegalvehicle',
  construction = 'construction',
  street = 'street',
}
