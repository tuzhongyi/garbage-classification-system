import { Transform } from 'class-transformer';
import { IModel } from '../model.interface';
import { transformDateTime } from '../transform.model';

/**	"CameraRecordUrl	(摄像机录像地址)"	*/
export class CameraRecordUrl implements IModel {
  /**	String	摄像机ID	M	*/
  CameraId!: string;
  /**	String	摄像机名称	O	*/
  CameraName?: string;
  /**	String	录像地址	O	*/
  RecordUrl?: string;
  /**	DateTime	抓取时间	O	*/
  @Transform(transformDateTime)
  CreateTime?: Date;
}
