export interface GarbageManagementListRecordEventItem<T = any> {
  id: string;
  name: string;
  type: string;
  time: Date;
  color: string;
  data: T;
}
export class GarbageManagementListRecordEventResult<T> {
  result = false;
  datas = new Array<T>();
}
