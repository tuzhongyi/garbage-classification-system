import { PagedParams } from '../../IParams.interface';

export class GetIasAccessPointsParams extends PagedParams {
  /**	String[]	ID列表	O	*/
  Ids?: string[];
  /**	String	名称，LIKE	O	*/
  Name?: string;
}
