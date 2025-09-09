import { EventDataObject } from '../garbage-station/event-data-object.model';
import { GisPoint } from '../garbage-station/gis-point.model';
import { IModel } from '../model.interface';

/**	EventResourceContent (AI事件资源内容)	*/
export class EventResourceContent implements IModel {
  /**	String	资源ID	M	*/
  ResourceId!: string;
  /**
   * String
   * 	资源类型：
   *  Camera：监控点
   *  EncodeDevice：编码设备
   *  IoTSensor：物联网传感器
   *  GarbageStation：垃圾房
   * O
   **/
  ResourceType?: string;
  /**	String	资源名称	M	*/
  ResourceName!: string;
  /**	Int32	摄像机机位	O	*/
  PositionNo?: number;
  /**
   * String
   * 关联的资源ID，
   * 如：资源类型为Shop时，如果有关联的注册商铺此处为注册商铺ID
   * O
   **/
  RelationId?: string;
  /**	Int64	数值	O	*/
  Value?: number;
  /**	String	图片地址	O	*/
  ImageUrl?: string;
  /**	String	录像地址	O	*/
  RecordUrl?: string;
  /**	EventDataObject[]	目标	O	*/
  Objects?: EventDataObject[];
  /**	GisPoint	Gis坐标	O	*/
  Location?: GisPoint;
}
