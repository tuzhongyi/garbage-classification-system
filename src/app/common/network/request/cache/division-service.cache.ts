import { Division } from '../../model/garbage-station/division.model';
import { PagedList } from '../../model/page_list.model';
import { GetDivisionsParams } from '../garbage/division/division-request.params';
import { IService } from './cache.interface';
import { ServiceCache } from './service.cache';

export class DivisionServiceCache extends ServiceCache<Division> {
  constructor(key: string, service: IService<Division>) {
    super(key, service, Division);
  }

  override async paged(
    params?: GetDivisionsParams
  ): Promise<PagedList<Division>> {
    if (params) {
      if (
        params.ParentId ||
        params.AncestorId ||
        params.DivisionType ||
        params.Name ||
        params.Ids
      ) {
        return super.paged(params);
      }
    }
    return this.service.paged(params);
  }

  getAncestor(ancestorId: string, datas: Division[]) {
    return datas.find((x) => x.Id === ancestorId);
  }

  getAllChildren(ancestorId: string, datas: Division[]) {
    let children = this.getChildren(ancestorId, datas);
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        let data = this.getAllChildren(child.Id, datas);
        children = [...children, ...data];
      }
    }
    return children;
  }

  getChildren(parentId: string, datas: Division[]) {
    return datas.filter((x) => x.ParentId === parentId);
  }

  getParent(parentId: string, datas: Division[]) {
    return datas.find((x) => x.Id === parentId);
  }

  override filter(datas: Division[], args: GetDivisionsParams): Division[] {
    if (args.ParentId) {
      datas = datas.filter((x) => x.ParentId === args.ParentId);
    }
    if (args.AncestorId) {
      datas = this.getAllChildren(args.AncestorId, datas);
    }
    if (args.DivisionType) {
      datas = datas.filter((x) => x.DivisionType === args.DivisionType);
    }
    if (args.Name) {
      datas = datas.filter((x) => x.Name.includes(args.Name!));
    }
    if (args.Ids) {
      datas = datas.filter((x) => args.Ids?.includes(x.Id));
    } else {
    }
    return datas;
  }
}
