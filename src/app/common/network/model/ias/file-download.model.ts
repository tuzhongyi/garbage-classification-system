import { Transform } from 'class-transformer';
import { IModel } from '../model.interface';
import { transformDateTime } from '../transform.model';

/**	FileDownload (文件下载信息)	*/
export class FileDownload implements IModel {
  /**	String	文件ID	O	*/
  Id?: string;
  /**	String	摄像机ID	O	*/
  CameraId?: string;
  /**	String	文件下载URL	M	*/
  Url!: string;
  /**	String	用户名	O	*/
  Username?: string;
  /**	String	密码	O	*/
  Password?: string;
  /**	DateTime	文件开始时间	O	*/
  @Transform(transformDateTime)
  BeginTime?: Date;
  /**	DateTime	文件结束时间	O	*/
  @Transform(transformDateTime)
  EndTime?: Date;
  /**	String	文件转换器，mp4Tomkv	O	*/
  Converter?: string;
  /**	String	文件类型, 文件最终类型。mkv	O	*/
  FileType?: string;
  /**	Int32	0-未完成，1-完成	M	*/
  State!: number;
  /**	Int64	文件大小	O	*/
  FileSize?: number;
}
