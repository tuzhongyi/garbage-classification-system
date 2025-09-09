import { PagedList } from '../../network/model/page_list.model';
import { PagedParams } from '../../network/request/IParams.interface';

export class ServiceTool {
  static async all<T extends PagedParams, R>(
    list: (params: T, ...args: any[]) => Promise<PagedList<R>>,
    params: T,
    ...args: any[]
  ): Promise<R[]> {
    let data: R[] = [];
    let index = 1;
    let paged: PagedList<R>;
    do {
      params.PageIndex = index;
      paged = await list(params, args);
      data = data.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return data;
  }
}
