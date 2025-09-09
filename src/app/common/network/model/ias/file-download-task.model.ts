import { Transform, Type } from 'class-transformer';
import { IIdModel } from '../model.interface';
import { transformDateTime } from '../transform.model';
import { FileDownload } from './file-download.model';

/**	FileDownloadTask (文件下载任务)	*/
export class FileDownloadTask implements IIdModel {
  /**	String	任务ID	M	*/
  Id!: string;
  /**	FileDownload[]	任务文件列表	M	*/
  @Type(() => FileDownload)
  Files!: FileDownload[];
  /**	Int32	0-未完成，1-完成	M	*/
  State!: number;
  /**	String	事件ID	O	*/
  EventId?: string;
  /**	Int32	事件类型	O	*/
  EventType?: number;
  /**	Boolean	调用完成URL成功	O	*/
  FinishedCalled?: boolean;
  /**	DateTime	创建时间	O	*/
  @Transform(transformDateTime)
  CreateTime?: Date;
  /**	DateTime	更新时间	O	*/
  @Transform(transformDateTime)
  UpdateTime?: Date;
  /**	String	任务完成后调用接口URL，只支持POST方法	O	*/
  FinishedCallUrl?: string;
  /**	DateTime	过期时间，一般都是24小时	O	*/
  @Transform(transformDateTime)
  ExpiredTime?: Date;
}
