import { PagedParams } from '../../IParams.interface';

export class GetIasDevicesParams extends PagedParams {
  /**	String	ID列表	O	*/
  Ids?: string;
  /**	String	序列号，支持LIKE	O	*/
  SerialNumber?: string;
  /**	String	名称，支持LIKE	O	*/
  Name?: string;
  /**	Int32	设备类型，1：巡逻车辆	O	*/
  DeviceType?: number;
  /**	Int32	在线状态，0：在线，1：离线	O	*/
  OnlineStatus?: number;
  /**	String	区划ID，（街道、网格）	O	*/
  DivisionId?: string;
}
