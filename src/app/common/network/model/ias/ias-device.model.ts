import { Transform, Type } from 'class-transformer';
import { GisPoint } from '../garbage-station/gis-point.model';
import { IIdNameModel } from '../model.interface';
import { transformDateTime } from '../transform.model';

/**	IasDevice (移动设备信息)	*/
export class IasDevice implements IIdNameModel {
  /**	String	设备唯一标识符	M	*/
  Id!: string;
  /**	String	设备名称	M	*/
  Name!: string;
  /**	String	设备序列号	M	*/
  SerialNumber!: string;
  /**	Int32	设备类型，1：巡逻车辆	M	*/
  DeviceType!: number;
  /**	String	描述信息	O	*/
  Description?: string;
  /**	GisPoint	当前Gis坐标	O	*/
  @Type(() => GisPoint)
  Location?: GisPoint;
  /**	Int32	在线状态，0：在线，1：离线	O	*/
  OnlineStatus?: number;
  /**	DateTime	最后在线时间	O	*/
  @Transform(transformDateTime)
  LastOnlineTime?: Date;
  /**	DateTime	创建时间	O	*/
  @Transform(transformDateTime)
  CreationTime?: Date;
  /**	DateTime	更新时间	O	*/
  @Transform(transformDateTime)
  UpdateTime?: Date;
  /**	String	区划ID，（街道、网格）	O	*/
  DivisionId?: string;
  /**	String	区划名称	O	*/
  DivisionName?: string;
  /**	String	接入点ID	M	*/
  AccessPointId!: string;
}
