/** 应答信息 */
export interface HowellResponse<T> {
  /**	Int32	错误码间附录3.3	M */
  FaultCode: number;
  /**	String 	错误原因	M */
  FaultReason: string;
  /**	ExceptionData	内部异常	O */
  InnerException?: ExceptionData;
  /**	T	应答实体数据	O */
  Data?: T;
}

/** 内部异常 */
export interface ExceptionData {
  /**	String	异常消息	M */
  Message: string;
  /**	String	异常类型	M */
  ExceptionType: string;
  /**	ExceptionData	内部异常	O */
  InnerException?: ExceptionData;
}

export interface HttpResponse<T> {
  data: HowellResponse<T>;
  status: number;
  statusText: string;
}

export class Fault {
  FaultCode!: number;
  FaultReason!: string;
  Exception?: ExceptionData;
  Id?: string;
}
