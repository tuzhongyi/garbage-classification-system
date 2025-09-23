/** 事件数量 */
export interface EventNumber {
  /**	Int32	事件类型	M */
  EventType: number;
  /**	Int32	当日事件数量	M */
  DayNumber: number;
  /**	Int32	当日时间段内事件数量	O */
  DeltaNumber?: number;
}
