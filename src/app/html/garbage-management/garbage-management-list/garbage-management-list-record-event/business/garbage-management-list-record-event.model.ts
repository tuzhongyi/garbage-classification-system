export interface GarbageManagementListRecordEventItem {
  id: string;
  name: string;
  type: string;
  time: Date;
  color: string;
}
export class GarbageManagementListRecordEventResult<T> {
  result = false;
  datas = new Array<T>();
}
