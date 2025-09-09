import { Transform, Type } from 'class-transformer';
import { GisPoint } from '../garbage-station/gis-point.model';
import { IIdModel } from '../model.interface';
import { transformBinary, transformDateTime } from '../transform.model';
import { Assignment } from './assignment.model';
import { EventResourceContent } from './event-resource-content.model';

/**	IasEventRecord (Ias分析事件记录)	*/
export class IasEventRecord implements IIdModel {
  /**	String	唯一ID	M	*/
  Id!: string;
  /**	String	设备ID，设备序列号，非实时事件，序列号无效。	M	*/
  DeviceId!: string;
  /**	DateTime	事件时间	M	*/
  @Transform(transformDateTime)
  EventTime!: Date;
  /**	Int32	事件类型	M	*/
  EventType!: number;
  /**	Int32	事件触发类型	M	*/
  TriggerType!: number;
  /**	DateTime	开始时间	O	*/
  @Transform(transformDateTime)
  BeginTime?: Date;
  /**	DateTime	结束时间	O	*/
  @Transform(transformDateTime)
  EndTime?: Date;
  /**	String	描述内容	O	*/
  Description?: string;
  /**	BASE64	扩展数据	O	*/
  @Transform(transformBinary)
  ExtensionData?: string;
  /**	EventResourceContent[]	报警事件资源列表	O	*/
  @Type(() => EventResourceContent)
  Resources?: EventResourceContent[];
  /**	Boolean	是否为实时事件，true：实时事件，false：非实时事件	O	*/
  IsLiveEvent?: boolean;
  /**	Assignment	派单和处置信息	O	*/
  Assignment?: Assignment;
  /**	GisPoint	Gis坐标	O	*/
  Location?: GisPoint;
  /**	String	区划ID	O	*/
  DivisionId?: string;
  /**	String	区划名称	O	*/
  DivisionName?: string;
  /**	String	音频文件ID	O	*/
  AudioUrl?: string;
  /**	String	视频文件ID	O	*/
  FileUrl?: string;
  /**	String	音频文件语音内容，一般情况下5分钟内会完成音频文件内容的解析	O	*/
  AudioContent?: string;
  /**	Int32	突发情况分类	O	*/
  EmergencyType?: number;
  /**	String	突发情况描述	O	*/
  EmergencyDescription?: string;
}
