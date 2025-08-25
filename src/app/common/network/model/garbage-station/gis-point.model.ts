import { Transform } from 'class-transformer';

import { GisType } from '../../../enum/gis-type.enum';
import { IModel } from '../model.interface';
import { transformDateTime } from '../transform.model';

/** 地理信息坐标点 */
export class GisPoint implements IModel {
  /**	Double	经度	M */
  Longitude!: number;
  /**	Double	纬度	M */
  Latitude!: number;
  /**	Double	高度	M */
  Altitude: number = 0;
  /**	Int32	楼层	O */
  Floor?: number;
  /**	Int32	坐标系类型	O */
  GisType?: GisType;
  /** */
}

/**	车辆行径坐标	*/
export class GisRoutePoint extends GisPoint {
  /**	DateTime	记录时间	M	*/
  @Transform(transformDateTime)
  Time!: Date;
  /**	String	称重垃圾桶ID	O	*/
  TrashCanId?: string;
}
