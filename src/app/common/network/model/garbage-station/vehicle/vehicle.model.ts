import { Transform, Type } from 'class-transformer';
import { IIdModel } from '../../model.interface';
import { transformDateTime, transformPictureUrl } from '../../transform.model';
import { GisPoint } from '../gis-point.model';

/**	Vehicle (车辆信息)	*/
export class Vehicle implements IIdModel {
  /**	String	车辆ID	M	*/
  Id!: string;
  /**	String	描述信息	O	*/
  Description?: string;
  /**	String	车牌号码，唯一	M	*/
  PlateNo!: string;
  /**	Int32	车牌颜色	O	*/
  PlateColor?: number;
  /**	Int32	车辆类型，	M	*/
  VehicleType!: number;
  /**	String	车牌照片地址	O	*/
  @Transform(transformPictureUrl)
  PlateImageUrl?: string;
  /**	String	车辆照片地址	O	*/
  @Transform(transformPictureUrl)
  VehicleImageUrl?: string;
  /**	String	区划ID	M	*/
  DivisionId!: string;
  /**	DateTime	创建时间	M	*/
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	DateTime	更新事件	M	*/
  @Transform(transformDateTime)
  UpdateTime!: Date;
  /**	GisPoint	区划中心GIS点位（无效）	O	*/
  @Type(() => GisPoint)
  GisPoint?: GisPoint;
}
