import { PagedParams } from '../../../request/IParams.interface';
import { AbstractUrl } from '../../abstract.url';
import { UrlHelper } from '../url-helper';

export class RoleInnerUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Roles`);
  }
  query(params?: PagedParams) {
    let query = UrlHelper.toQueryString(params);
    return `${this.basic()}${query}`;
  }
}
