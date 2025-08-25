import { Transform } from 'class-transformer';
import { DivisionType } from '../../../enum/division-type.enum';
import { IIdNameModel, IdNameModel } from '../model.interface';
import { transformDateTime } from '../transform.model';
import { GisArea } from './gis-area.model';
import { GisPoint } from './gis-point.model';

/** 区划 */
export class Division extends IdNameModel {
  /**	String	父区划ID，如果是根区域节点，则该ID为空	O */
  ParentId?: string;
  /**	Boolean	是否为叶节点的区域	M */
  IsLeaf!: boolean;
  /**	String	外部扩展ID，用于国标区划编码	O */
  ExternalId?: string;
  /**	String	区划完整路径，含本节点，@进行分割，上级节点在前	O */
  DivisionPath?: string;
  /**	String	描述信息	O */
  Description?: string;
  /**	Int32	人口	O */
  Population?: number;
  /**	Int32	区划类型，用于图标区分	M */
  DivisionType!: DivisionType;
  /**	DateTime	创建时间	M */
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	DateTime	更新事件	M */
  @Transform(transformDateTime)
  UpdateTime!: Date;
  /**	GisPoint	区划中心GIS点位	O */
  GisPoint?: GisPoint;
  /**	GisArea	区划GIS点位区域	O */
  GisArea?: GisArea;
}
export interface IDivision extends IIdNameModel {
  DivisionType: DivisionType;
}
