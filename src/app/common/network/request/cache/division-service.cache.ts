import { plainToInstance } from 'class-transformer';
import { Division } from '../../model/garbage-station/division.model';
import { PagedList } from '../../model/page_list.model';
import { GetDivisionsParams } from '../garbage/division/division-request.params';
import { IService } from './cache.interface';
import { ServiceCache } from './service.cache';

export class DivisionServiceCache extends ServiceCache<Division> {
  constructor(key: string, service: IService<Division>) {
    super(key, service, Division);
  }

  override async get(id: string): Promise<Division> {
    return new Promise((reject) => {
      this.wait((data) => {
        let result = data.find((x) => x.Id === id);
        if (result) {
          reject(plainToInstance(Division, result));
          return;
        }
        this.service.get(id).then((x) => {
          let datas = this.load();
          if (!datas) datas = [];
          let index = datas.findIndex((x) => x.Id == id);
          if (index < 0) {
            datas.push(x);
            this.save(datas);
          }
          reject(x);
        });
      });
    });
  }

  override async list(args?: GetDivisionsParams): Promise<PagedList<Division>> {
    return new Promise((reject) => {
      this.wait((x: Division[]) => {
        let datas = plainToInstance(Division, x);
        let paged: PagedList<Division>;
        if (args) {
          datas = this.filter(datas, args);
          paged = this.getPaged(datas, args);
        } else {
          paged = this.getPaged(datas);
        }
        reject(paged);
      });
    });
  }

  async array(args?: GetDivisionsParams) {
    return new Promise<Division[]>((reject) => {
      this.wait((x: Division[]) => {
        let datas = plainToInstance(Division, x);
        if (args) {
          datas = this.filter(datas, args);
        } else {
        }
        reject(datas);
      });
    });
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
