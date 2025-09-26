import { DrawPolygon } from '../../../../../common/components/picture/picture-polygon-multiple/picture-polygon-multiple.model';
import { IEventRecord } from '../../../../../common/network/model/garbage-station/event-record/garbage-event-record.model';
import { GarbageStation } from '../../../../../common/network/model/garbage-station/garbage-station.model';
import { Page } from '../../../../../common/network/model/page_list.model';

export class EventHandleCompleteArgs<T = any> {
  type = 0;
  page = new Page();
  data!: IEventRecord<T>;
}

export class EventRecordCompleteModel<T = any> {
  Record!: IEventRecord<T>;
  GarbageStation!: Promise<GarbageStation>;
  Items: EventHandleCompleteModel[] = [];
  RecordNo!: string;
  Duration!: { begin: Date; end?: Date };
}
export class EventHandleCompleteModel {
  Time!: Date;
  Index!: number;
  Title!: string;
  Type!: EventHandleCompleteModelType;
  urls: { url: string; polygon: DrawPolygon[] }[] = [];
  Minitues?: number;
  top = false;
  bottom = false;
  left = false;
  TitleColor!: string;
  infos: string[] = [];
}

export interface EventHandleCompleteImageArgs {
  model: EventHandleCompleteModel;
  index: number;
}

export enum EventHandleCompleteModelType {
  event,
  timeout,
  handle,
}
