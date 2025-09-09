import { Transform } from 'class-transformer';
import { IModel } from '../model.interface';
import { Time } from '../time.model';
import { transformDateTime, transformTime } from '../transform.model';

/**	IasGpsItem (文件中的GPS信息)	*/
export class IasGpsItem implements IModel {
  /**	Int64	坐标序号，从1开始	M	*/
  No!: number;
  /**	Double	经度	M	*/
  Longitude!: number;
  /**	Double	纬度	M	*/
  Latitude!: number;
  /**	DateTime	绝对时间	O	*/
  @Transform(transformDateTime)
  OSDTime?: Date;
  /**	Time	相对时间	M	*/
  @Transform(transformTime)
  OffsetTime!: Time;
  /**	Double	速度，KM/h	O	*/
  Speed?: number;
  /**	Double	偏北角，顺时针0-360度	O	*/
  Course?: number;
  /**	Double	加速度计X轴加速度，单位为m/s2	O	*/
  AccX?: number;
  /**	Double	加速度计Y轴加速度，单位为m/s2	O	*/
  AccY?: number;
  /**	String	道路ID	O	*/
  RoadId?: string;
  /**	String	道路名称	O	*/
  RoadName?: string;
}
