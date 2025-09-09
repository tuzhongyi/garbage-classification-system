import { DurationParams, PagedDurationParams } from '../../IParams.interface';

export class GetIasEventsParams extends PagedDurationParams {
  /**	String[]	ID列表	O	*/
  Ids?: string[];
  /**	Int32	事件类型	O	*/
  EventType?: number;
  /**	Int32	突发情况分类	O	*/
  EmergencyType?: number;
  /**	String[]	区划列表	O	*/
  DivisionIds?: string[];
  /**	String	升序属性，不区分大小写	O	*/
  Asc?: string;
  /**	String	降序属性，不区分大小写	O	*/
  Desc?: string;
}
export class GetIasEventNumbersParams extends DurationParams {
  /**	String	网格ID	O	*/
  GridCellId?: string;
  /**	String	区划ID	O	*/
  DivisionId?: string;
  /**	Int32[]	统计的事件类型，参见3.2.15	M	*/
  IasEventTypes!: number[];
}
