import { ResourceLabel } from '../../../model/garbage-station/resource-label.model';
import { PagedList } from '../../../model/page_list.model';
import { ResourcesUrl } from '../../../url/aiop/resources/resources.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import {
  AbstractService,
  ICreate,
  IDelete,
  IUpdate,
} from '../../cache/cache.interface';
import {
  GetBatchParams,
  GetResourceLabelsParams,
} from './resource-label.params';

export class ResourceLabelRequestService
  extends AbstractService<ResourceLabel>
  implements
    ICreate<ResourceLabel>,
    IUpdate<ResourceLabel>,
    IDelete<ResourceLabel>
{
  private type: HowellBaseTypeRequestService<ResourceLabel>;
  constructor(private basic: HowellBaseRequestService) {
    super();
    this.type = basic.type(ResourceLabel);
  }

  create(data: ResourceLabel) {
    let url = ResourcesUrl.label().basic();
    return this.type.post(url, data);
  }

  binding(resourceId: string, labelId: string) {
    let url = ResourcesUrl.label(resourceId).item(labelId);
    return this.type.post(url);
  }

  get(id: string, resourceId?: string): Promise<ResourceLabel> {
    let url = ResourcesUrl.label(resourceId).item(id);
    return this.type.get(url);
  }
  update(data: ResourceLabel, resourceId?: string): Promise<ResourceLabel> {
    let url = ResourcesUrl.label(resourceId).item(data.Id);
    return this.type.put(url, data);
  }
  delete(id: string, resourceId?: string): Promise<ResourceLabel> {
    let url = ResourcesUrl.label(resourceId).item(id);
    return this.type.delete(url);
  }

  paged(
    params: GetResourceLabelsParams = new GetResourceLabelsParams()
  ): Promise<PagedList<ResourceLabel>> {
    let url = ResourcesUrl.label().list();
    return this.type.paged(url, params);
  }

  override array(params: GetBatchParams) {
    let url = ResourcesUrl.label().batch(params.LabelId);
    return this.type.getArray(url);
  }
}
