import { Transform } from 'class-transformer';
import { EventDataObject } from './garbage-station/event-data-object.model';
import { EventRule } from './garbage-station/event-rule';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';

/**
 *  视频Url地址
 *
 *  Url示例：
 *  ws!://116.228.67.70!:8800/ws/video/howellps/live/00310101031111111000096000000000/1/0/live.h264?user=howell&password=pwd123456
 *  ws!://116.228.67.70!:8800/ws/video/howellps/vod/00310101031111111000096000000000/1/0/2021-01-18T05!:29!:24.856Z_2021-01-18T06!:29!:24.856Z/vod.h264?user=howell&password= pwd123456
 *  QueryString中的user，password请使用用户登录的用户名密码，此处示例中的用户名密码不一定是实际项目中的用户名密码
 *
 */
export class VideoUrl implements IModel {
  /**	String	Url地址	M */
  Url!: string;
  /**	String	用户名	O */
  Username?: string;
  /**	String	密码	O */
  Password?: string;
  /**	String	网页Url地址	O */
  WebUrl?: string;
}
/** 摄像机照片地址 */
export class CameraImageUrl implements IModel {
  /**	String	摄像机ID	M */
  CameraId!: string;
  /**	String	摄像机名称	O */
  CameraName?: string;
  /**	String	照片地址	M */
  ImageUrl!: string;
  /**	EventDataObject[]	垃圾的目标v3.4	O */
  Objects?: EventDataObject[];
  /**	EventRule[]	事件规则 v3.4	O */
  Rules?: EventRule[];
}

/** 摄像机照片信息 */
export class CameraPictureUrl implements IModel {
  /**	Boolean	抓图结果，True：成功	M */
  Result!: boolean;
  /**	String	图片ID	O */
  Id?: string;
  /**	String	图片URL地址	O */
  Url?: string;
  /**	DateTime	创建时间	M */
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	String	摄像机ID	M */
  CameraId!: string;
  /**	String	摄像机名称	O */
  CameraName?: string;
}
/** 录像文件Url */
export class RecordFileUrl implements IModel {
  /**	Boolean	结果，True：成功	M */
  Result!: boolean;
  /**	String	图片URL地址	M */
  Url!: string;
}
