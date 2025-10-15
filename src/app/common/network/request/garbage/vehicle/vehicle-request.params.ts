import { PagedParams } from '../../IParams.interface';

export class GetVehiclesParams extends PagedParams {
  /**	String[]	车辆ID列表	O	*/
  Ids?: string[];
  /**	String	车牌号码，支持LIKE	O	*/
  PlateNo?: string;
  /**	Int32	车牌颜色	O	*/
  PlateColor?: number;
  /**	Int32	车辆类型，	O	*/
  VehicleType?: number;
  /**	String	区划ID	O	*/
  DivisionId?: string;
  /**	String	祖辈ID，返回该ID下的所有子孙区划信息	O	*/
  AncestorId?: string;
}
