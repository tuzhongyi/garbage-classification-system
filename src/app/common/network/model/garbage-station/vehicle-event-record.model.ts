import {
  plainToInstance,
  Transform,
  TransformFnParams,
} from 'class-transformer';

import { CollectionPointClassification } from '../../../enum/collection-point-classification.enum';
import { CollectionPointScore } from '../../../enum/collection-point-score.enum';
import { VehicleEventType } from '../../../enum/event-type.enum';
import { OnlineStatus } from '../../../enum/online-status.enum';
import { VehicleResourceType } from '../../../enum/resource-type.enum';
import { TrashCanType } from '../../../enum/trashcan-type.enum';
import { GisPoint } from './gis-point.model';

function EventRecordDataTransformer(params: TransformFnParams) {
  let record = params.obj as EventRecordData<any>;
  switch (record.EventType) {
    case VehicleEventType.Collection:
      return plainToInstance(GarbageCollectionEventData, params.value);
    case VehicleEventType.RelayStateChange:
      return plainToInstance(RelayStateChangeEventData, params.value);
    case VehicleEventType.VehicleOnline:
    case VehicleEventType.VehicleOnline2:
      return plainToInstance(VehicleOnlineEventData, params.value);
    case VehicleEventType.CameraOnline:
      return plainToInstance(CameraOnlineEventData, params.value);
    default:
      throw new Error('EventRecordDataTransformer unknow eventtype');
  }
}

// 事件基础类型
class BaseEventRecord {
  // 事件ID
  EventId!: string;

  // 事件时间
  @Transform(transformDateTime)
  EventTime!: Date;

  // 事件类型
  EventType!: VehicleEventType;

  // 事件描述信息
  EventDescription?: string;

  // 资源ID
  ResourceId?: string;

  // 资源类型
  ResourceType?: VehicleResourceType;

  // 资源名称
  ResourceName?: string;

  // 图片ID、图片地址
  ImageUrl?: string;

  // 录像文件ID、录像地址
  RecordUrl?: string;

  // 事件关键字
  EventIndexes?: string[];
}

class EventRecordData<T> extends BaseEventRecord {
  @Transform((x) => EventRecordDataTransformer(x), { toClassOnly: true })
  Data!: T;
}

/**	垃圾清运记录事件	*/
export class GarbageCollectionEventData {
  /**	String	清运车辆ID	M	*/
  VehicleId!: string;
  /**	String	清运车辆名称	M	*/
  VehicleName!: string;
  /**	String	区划ID	O	*/
  DivisionId?: string;
  /**	String	区划名称	O	*/
  DivisionName?: string;
  /**	String	清运人员ID	O	*/
  MemberId?: string;
  /**	String	清运人员姓名	O	*/
  MemberName?: string;
  /**	String	垃圾桶ID	O	*/
  TrashCanId?: string;
  /**	String	垃圾桶名称	O	*/
  TrashCanName?: string;
  /**	Int32	垃圾类型	O	*/
  TrashCanType?: TrashCanType;
  /**	String	地址	O	*/
  Address?: string;
  /**	Double	垃圾重量，KG	O	*/
  Weight?: number;
  /**	Int32	分类评分：1-差评，2-中评，3-好评	O	*/
  Score?: CollectionPointScore;
  /**	GisPoint	坐标	O	*/
  GisPoint?: GisPoint;
  /**	String	垃圾收运点ID	O	*/
  CollectionPointId?: string;
  /**	String	垃圾收运点名称	O	*/
  CollectionPointName?: string;
  /**	Int32	垃圾收运点类型	O	*/
  Classification?: CollectionPointClassification;
}

/**	垃圾清运记录事件	*/
export class GarbageCollectionEventRecord extends EventRecordData<GarbageCollectionEventData> {}

/**	继电器状态变更事件	*/
export class RelayStateChangeEventData {
  /**	String	清运车辆ID	M	*/
  VehicleId!: string;
  /**	String	清运车辆名称	M	*/
  VehicleName!: string;
  /**	String	区划ID	O	*/
  DivisionId?: string;
  /**	String	区划名称	O	*/
  DivisionName?: string;
  /**	Int32	变更后的继电器状态，0-关闭，1-打开	M	*/
  Relay!: number;
}
/**	继电器状态变更事件	*/
export class RelayStateChangeEventRecord extends EventRecordData<RelayStateChangeEventData> {}

/**	清运车辆上线事件	*/
export class VehicleOnlineEventData {
  /**	String	清运车辆ID	M	*/
  VehicleId!: string;
  /**	String	清运车辆名称	M	*/
  VehicleName!: string;
  /**	String	区划ID	O	*/
  DivisionId?: string;
  /**	String	区划名称	O	*/
  DivisionName?: string;
  /**	Int32	在线状态0-正常，1-离线	M	*/
  OnlineStatus!: OnlineStatus;
}

/**	清运车辆上线事件	*/
export class VehicleOnlineEventRecord extends EventRecordData<VehicleOnlineEventData> {}

/**	摄像机上线事件	*/
export class CameraOnlineEventData {
  /**	String	清运车辆ID	O	*/
  VehicleId?: string;
  /**	String	清运车辆名称	O	*/
  VehicleName?: string;
  /**	String	区划ID	O	*/
  DivisionId?: string;
  /**	String	区划名称	O	*/
  DivisionName?: string;
  /**	String	摄像机ID	M	*/
  CameraId!: string;
  /**	String	摄像机名称	M	*/
  CameraName!: string;
  /**	Int32	在线状态0-正常，1-离线	M	*/
  OnlineStatus!: OnlineStatus;
}

/**	摄像机上线事件	*/
export class CameraOnlineEventRecord extends EventRecordData<CameraOnlineEventData> {}
