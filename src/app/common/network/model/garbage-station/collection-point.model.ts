import { Transform } from 'class-transformer';

import { CollectionPointClassification } from '../../../enum/collection-point-classification.enum';
import { transformDateTime } from '../transform.model';
import { GisPoint } from './gis-point.model';
import { CollectionTrashCan } from './trash-can.model';

/**	收运点	*/
export class CollectionPoint {
  /**	String	收运点ID	M	*/
  Id!: string;
  /**	String	收运点名称	M	*/
  Name!: string;
  /**	Int32	收运点类型	M	*/
  Classification!: CollectionPointClassification;
  /**	String	收运点地址	O	*/
  Address?: string;
  /**	String	描述信息	O	*/
  Description?: string;
  /**	DateTime	创建时间	M	*/
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	DateTime	更新事件	M	*/
  @Transform(transformDateTime)
  UpdateTime!: Date;
  /**	GisPoint	当前位置GIS点位	O	*/
  GisPoint?: GisPoint;
  /**	String	所属区划ID	O	*/
  DivisionId?: string;
  /**	TrashCan[]	垃圾桶列表	O	*/
  TrashCans?: CollectionTrashCan[];
}
