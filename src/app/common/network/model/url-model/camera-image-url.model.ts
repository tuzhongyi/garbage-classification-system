import { EventDataObject } from '../garbage-station/event-data-object.model';
import { EventRule } from '../garbage-station/event-rule';
import { IModel } from '../model.interface';

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
