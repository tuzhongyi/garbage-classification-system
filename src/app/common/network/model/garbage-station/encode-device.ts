import { EncodedDeviceType } from '../../../enum/device-type.enum';
import { OnlineStatus } from '../../../enum/online-status.enum';
import { ProtocolType } from '../../../enum/protocol-type.enum';
import { TransType } from '../../../enum/trans-type.enum';
import { Resource } from './resource.model';

/**编码设备信息 */
export class EncodeDevice extends Resource {
  /**传输类型(可选)　0：UDP，1：TCP */
  TransType?: TransType;
  /**协议类型(可选) Howell，Hikvision，UniView */
  ProtocolType?: ProtocolType;
  /**状态(可选) 0-正常,1-离线 */
  OnlineStatus?: OnlineStatus;
  /**型号(可选) */
  Model?: string;
  /**序列号(可选) */
  SerialNumber?: string;
  /**厂商(可选) */
  Manufactory?: string;
  /**连接地址(可选) */
  Url!: string;
  /**用户名(可选) */
  Username?: string;
  /**密码(可选) */
  Password?: string;
  /**能力(可选) */
  CapabilitySet?: string[];
  /**能力名称(可选) */
  CapabilitySetName?: string[];
  /**固件版本号(可选) */
  FirmwareVersion?: string;
  /**固件版本号(可选) */
  SoftwareVersion?: string;
  /**固件版本号(可选) */
  HardwareVersion?: string;
  /**设备类型(可选) NVR，IPC，DVS */
  DeviceType?: EncodedDeviceType;
  SRSId?: string; //String	流媒体ID
  SRServerId?: string; //String	流媒体服务器ID
}
