import { Transform } from 'class-transformer';
import { CameraClassification } from '../../../enum/camera-classification.enum';
import { CameraEncodeType } from '../../../enum/camera-type.enum';
import { CameraUsage } from '../../../enum/camera-usage.enum';
import { OnlineStatus } from '../../../enum/online-status.enum';
import { IModel } from '../model.interface';
import { transformDateTime } from '../transform.model';
import { ICamera } from './camera.interface';

/** 摄像机 */
export class Camera implements ICamera, IModel {
  /**	String	摄像机ID	M */
  Id!: string;
  /**	String	摄像机名称	M */
  Name!: string;
  /**	Int32	摄像机用途	M */
  CameraUsage!: CameraUsage;
  /**	DateTime	创建时间	M */
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	DateTime	更新事件	M */
  @Transform(transformDateTime)
  UpdateTime!: Date;
  /**	String	垃圾桶房	M */
  GarbageStationId!: string;
  /**
   * 	Int32	位置编号，
   *  箱外：1-9
   *  箱内：11-19
   *  11,15：干垃圾
   *  12：湿垃圾
   *  13：可回收垃圾
   *  14：有害垃圾	O
   */
  PositionNo?: number;

  /**	String	垃圾满溢照片路径	O */
  GarbageFullImageUrl?: string;
  /**	DateTime	垃圾满溢时间	O */
  @Transform(transformDateTime)
  GarbageFullTime?: Date;
  /**	Boolean	是否满溢	O */
  IsFull?: boolean;
  /**	Int32	在线状态0-正常，1-离线	O */
  OnlineStatus?: OnlineStatus;
  /**	String	照片URL或ID	O */
  ImageUrl?: string;
  /**	DateTime	照片时间	O */
  @Transform(transformDateTime)
  ImageTime?: Date;
  /**	Int32	场景变换：0-正常，1-稍微偏移，2-严重偏移	O */
  SceneChange?: number;
  /**	Int32	清晰度：0-正常，1-轻微模糊，2-严重模糊	O */
  ImageQuality?: number;
  /**	Int32	视频亮度：0-很暗，1-稍暗 ，2-正常，3-稍亮，4-很亮	O */
  Brightness?: number;
  /**	Int32	色差/偏色 0-正常，1-轻微偏色，2-严重偏色	O */
  Aberration?: number;
  /**	Int32	视频干扰，0-正常，1-条纹干扰	O */
  Disturbance?: number;

  /**	String	摄像机类型，G3、G5、TD	O */
  CameraType?: CameraEncodeType;
  /**
   * 	Int32	摄像机分类
   *  0：普通摄像机
   *  1：热成像摄像机	O
   */
  Classification?: CameraClassification;

  /**	String	编码设备ID	O */
  EncodeDeviceId?: string;

  /**	Int32	录像状态：0-正常，1-故障(暂时无效)	O */
  RecordState?: number;
  /**	DateTime	故障时间	O */
  @Transform(transformDateTime)
  AbnormalTime?: Date;
  /**	DateTime	离线时间	O */
  @Transform(transformDateTime)
  OfflineTime?: Date;
}
