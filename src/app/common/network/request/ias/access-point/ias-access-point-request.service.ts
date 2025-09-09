import { IasAccessPoint } from '../../../model/ias/ias-access-point.model';
import { PagedList } from '../../../model/page_list.model';
import { IasUrl } from '../../../url/ias/ias.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { AbstractService } from '../../cache/cache.interface';
import { GetIasAccessPointsParams } from './ias-access-point-request.params';

export class IasAccessPointRequestService extends AbstractService<IasAccessPoint> {
  constructor(private basic: HowellBaseRequestService) {
    super();
    this.type = basic.type(IasAccessPoint);
  }

  private type: HowellBaseTypeRequestService<IasAccessPoint>;

  override list(
    params = new GetIasAccessPointsParams()
  ): Promise<PagedList<IasAccessPoint>> {
    let url = IasUrl.access.point.list();
    return this.type.paged(url, params);
  }
  override get(id: string): Promise<IasAccessPoint> {
    let url = IasUrl.access.point.item(id);
    return this.type.get(url);
  }
  create(data: IasAccessPoint): Promise<IasAccessPoint> {
    let url = IasUrl.access.point.basic();
    return this.type.post(url, data);
  }
  update(data: IasAccessPoint): Promise<IasAccessPoint> {
    let url = IasUrl.access.point.item(data.Id);
    return this.type.put(url, data);
  }
  delete(id: string): Promise<IasAccessPoint> {
    let url = IasUrl.access.point.item(id);
    return this.type.delete(url);
  }
  sync(id: string): Promise<string> {
    let url = IasUrl.access.point.sync(id);
    return this.basic.postReturnString(url);
  }
}
