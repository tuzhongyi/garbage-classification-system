import {
  DurationParams,
  PagedDurationParams,
} from '../../../IParams.interface';

export class GetIasDeviceRoutesParams extends PagedDurationParams {
  /**	String	设备ID	M */
  DeviceId!: string;
}
export class GetMobileDeviceRoutesStatisticParams extends DurationParams {
  /**	Double	运动时长最小速度，默认3.6，单位：km/h	O */
  MinSpeed?: number;
  /**	String	设备ID	M */
  MobileDeviceId!: string;
}
