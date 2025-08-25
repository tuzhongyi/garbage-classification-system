import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionMember } from '../../../model/garbage-station/member.model';
import { PagedList } from '../../../model/page_list.model';
import { GarbageVehicleMemberUrl } from '../../../url/garbage-vehicle/member.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { ExcelService } from '../../excel.service';
import { HowellAuthHttpService } from '../../howell-auth-http.service';
import { GetCollectionMembersParams } from './member-request.params';
@Injectable({
  providedIn: 'root',
})
export class CollectionMemberRequsetService {
  private basic: HowellBaseRequestService;
  private type: HowellBaseTypeRequestService<CollectionMember>;
  constructor(private http: HowellAuthHttpService, router: Router) {
    this.basic = new HowellBaseRequestService(http, router);
    this.type = this.basic.type(CollectionMember);
  }

  get(id: string): Promise<CollectionMember> {
    let url = GarbageVehicleMemberUrl.item(id);
    return this.type.get(url);
  }
  update(data: CollectionMember): Promise<CollectionMember> {
    let url = GarbageVehicleMemberUrl.item(data.Id);
    return this.type.put(url, data);
  }
  create(data: CollectionMember): Promise<CollectionMember> {
    let url = GarbageVehicleMemberUrl.basic();
    return this.type.post(url, data);
  }
  delete(id: string): Promise<CollectionMember> {
    let url = GarbageVehicleMemberUrl.item(id);
    return this.type.delete(url);
  }
  list(
    params: GetCollectionMembersParams = new GetCollectionMembersParams()
  ): Promise<PagedList<CollectionMember>> {
    let url = GarbageVehicleMemberUrl.list();
    return this.type.paged(url, params);
  }

  get excel() {
    return new ExcelService(this.http, GarbageVehicleMemberUrl.excels());
  }
}
