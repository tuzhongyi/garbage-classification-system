import { Transform } from 'class-transformer';
import { IIdNameModel } from '../model.interface';
import { transformDateTime } from '../transform.model';

/**	IasAccessPoint (Ias分析服务接入点)	*/
export class IasAccessPoint implements IIdNameModel {
  /**	String	唯一ID	M	*/
  Id!: string;
  /**	String	接入点名称	M	*/
  Name!: string;
  /**	String	访问地址	M	*/
  Url!: string;
  /**	String	用户名	O	*/
  Username?: string;
  /**	String	密码	O	*/
  Password?: string;
  /**	String	临时的接入令牌	O	*/
  Token?: string;
  /**	DateTime	令牌过期时间	O	*/
  @Transform(transformDateTime)
  TokenExpiredTime?: Date;
  /**	Int32	同步间隔时间，单位：分钟	M	*/
  IntervalMinutes!: number;
  /**	String	关联的区划ID，（街道、网格）	M	*/
  DivisionId!: string;
  /**	String	关联的区划名称	O	*/
  DivisionName?: string;
  /**	String	MQTT地址	O	*/
  MqttUrl?: string;
  /**	String	MQTT用户名	O	*/
  MqttUsername?: string;
  /**	String	MQTT密码	O	*/
  MqttPassword?: string;
  /**	String[]	用户分组ID列表	M	*/
  GroupGuids!: string[];
  /**	DateTime	创建时间	O	*/
  @Transform(transformDateTime)
  CreationTime?: Date;
  /**	DateTime	更新时间	O	*/
  @Transform(transformDateTime)
  UpdateTime?: Date;
}
