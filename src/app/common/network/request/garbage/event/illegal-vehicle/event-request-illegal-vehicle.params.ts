import { IParams } from '../../../IParams.interface';
import { GetEventRecordsParams } from '../event-request.params';

export class GetIllegalVehicleEventRecordsParams extends GetEventRecordsParams {
  /**	String	车牌号码，支持LIKE	O	*/
  PlateNo?: string;
  /**	Int32	车牌颜色	O	*/
  PlateColor?: number;
  /**
   * Int32
   * 车辆类型，
   * 0：未知车辆，
   * 1：白名单车辆，
   * 2：黑名单车辆，
   * 	O
   **/
  VehicleType?: number;

  /**	Boolean	处置人员是否已处置	O	*/
  Processed?: boolean;
  /**	String	处置人员名称	O	*/
  ProcessorName?: string;
  /**	String	手机号码	O	*/
  ProcessorMobileNo?: string;
  /**	String	处置描述	O	*/
  ProcessDescription?: string;
}
export class EventProcessParams implements IParams {
  /**	String	处置人员名称	M	*/
  ProcessorName!: string;
  /**	String	处置人员ID	M	*/
  ProcessorId!: string;
  /**	String	手机号码	M	*/
  ProcessorMobileNo!: string;
  /**	String	处置描述	O	*/
  ProcessDescription?: string;
}
