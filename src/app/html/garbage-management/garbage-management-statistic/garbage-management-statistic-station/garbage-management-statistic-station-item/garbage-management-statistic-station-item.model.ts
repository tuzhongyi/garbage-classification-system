export class GarbageManagementStatisticStationItem {
  icon = GarbageManagementStatisticRecordIcon.illegaldrop;
  value = 0;
  name = '';
  show = true;
}
export enum GarbageManagementStatisticRecordIcon {
  mixedinto = 'mixedinto',
  illegaldrop = 'illegaldrop',
  illegalvehicle = 'illegalvehicle',
  street = 'street',
}
