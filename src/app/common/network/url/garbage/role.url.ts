import { PagedParams } from '../../request/IParams.interface';
import { BaseUrl } from '../base.url';

import { UserInnerUrl } from './inner/user.url';
import { UrlHelper } from './url-helper';

export class RoleUrl {
  static basic(params?: PagedParams) {
    let query = UrlHelper.toQueryString(params);
    return `${BaseUrl.user_system}/Roles${query}`;
  }
  static item(id: string) {
    return `${this.basic()}/${id}`;
  }
  static list() {
    return `${this.basic()}/List`;
  }

  static user(roleId: string) {
    return new UserInnerUrl(this.item(roleId));
  }
}
