import { Transform } from 'class-transformer';
import { transformDateTime } from '../../transform.model';
import { CameraImageUrl } from '../../url-model/camera-image-url.model';
import { CameraRecordUrl } from '../../url-model/camera-record-url.model';
import { EventRecordData } from './garbage-event-record.model';

/** 乱丢垃圾事件 */
export class IllegalVehicleEventRecord extends EventRecordData<IllegalVehicleEventData> {}

export class IllegalVehicleEventData {
  /**	String	垃圾房ID	M	*/
  StationId!: string;
  /**	String	垃圾房名称	M	*/
  StationName!: string;
  /**	String	区划ID	O	*/
  DivisionId?: string;
  /**	String	区划名称	O	*/
  DivisionName?: string;
  /**	DateTime	开始时间	O	*/
  @Transform(transformDateTime)
  BeginTime?: Date;
  /**	DateTime	结束时间	O	*/
  @Transform(transformDateTime)
  EndTime?: Date;
  /**	CameraImageUrl[]	图片ID、图片地址列表	O	*/
  CameraImageUrls?: CameraImageUrl[];
  /**	CameraRecordUrl[]	录像ID、录像地址列表	O	*/
  CameraRecordUrls?: CameraRecordUrl[];
  /**	String	网格单元ID	O	*/
  GridCellId?: string;
  /**	String	网格单元名称	O	*/
  GridCellName?: string;
  /**	String	小区ID	O	*/
  CommunityId?: string;
  /**	String	小区名称	O	*/
  CommunityName?: string;
  /**	String	车牌号码	M	*/
  PlateNo!: string;
  /**
   * Int32
   * 车牌颜色
   * 0：其他
   * 1：蓝色
   * 2：黄色
   * 3：白色
   * 4：黑色
   * 5：绿色
   *  O
   **/
  PlateColor?: number;
  /**
   * 	Int32
   * 	车辆类型，
   *  0：未知车辆，
   *  1：白名单车辆，
   *  2：黑名单车辆，
   * 	O
   **/
  VehicleType?: number;
  /**	String	车牌照片地址	O	*/
  PlateImageUrl?: string;
  /**	String	车辆照片地址	O	*/
  VehicleImageUrl?: string;
  /**	Boolean	处置人员是否已处置	O	*/
  Processed?: boolean;
  /**	String	处置人员名称	O	*/
  ProcessorName?: string;
  /**	String	处置人员ID	O	*/
  ProcessorId?: string;
  /**	String	手机号码	O	*/
  ProcessorMobileNo?: string;
  /**	DateTime	处置时间	O	*/
  @Transform(transformDateTime)
  ProcessTime?: Date;
  /**	String	处置描述	O	*/
  ProcessDescription?: string;
}
