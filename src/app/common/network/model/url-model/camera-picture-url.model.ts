import { Transform } from 'class-transformer';
import { IModel } from '../model.interface';
import { transformDateTime } from '../transform.model';

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
