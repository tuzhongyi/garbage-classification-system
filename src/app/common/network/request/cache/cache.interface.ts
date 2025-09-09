import { ServiceTool } from '../../../tools/service-tool/service.tool';
import { IIdModel } from '../../model/model.interface';
import { PagedList } from '../../model/page_list.model';
import { IParams, PagedParams } from '../IParams.interface';
import { ServiceCache } from './service.cache';

export interface IData {
  Id: string;
}

export interface IService<T extends IIdModel> {
  cache: ServiceCache<T>;
  list: (params?: IParams, ...args: any[]) => Promise<PagedList<T>>;
  all: <P extends PagedParams>(params?: P, ...args: any[]) => Promise<T[]>;
  get: (id: string, ...args: any[]) => Promise<T>;
}
export abstract class AbstractService<T extends IIdModel>
  implements IService<T>
{
  all<P extends PagedParams>(
    params = new PagedParams(),
    ...args: any[]
  ): Promise<T[]> {
    return ServiceTool.all<P, T>(
      (_params, _args) => {
        return this.list(_params, _args);
      },
      params as P,
      args
    );
  }
  abstract list(params?: IParams, ...args: any[]): Promise<PagedList<T>>;
  abstract get(id: string, ...args: any[]): Promise<T>;
}
export interface AbstractService<T extends IIdModel> {
  cache: ServiceCache<T>;
}

class AppCacheData {
  [key: string]: any;
}

export class AppCache {
  constructor(public timeout: number) {}
  private static data = new AppCacheData();

  private countdown(key: string, timeout: number) {
    setTimeout(() => {
      this.del(key);
    }, timeout);
  }

  // get(key: string) {
  //   let str = AppCache.data[key];
  //   if (str) {
  //     return JSON.parse(str);
  //   }
  //   return undefined;
  // }
  // set(key: string, value: any, timeout: number) {
  //   AppCache.data[key] = JSON.stringify(value);
  //   this.countdown(key, timeout);
  // }
  get(key: string) {
    return AppCache.data[key];
  }
  set(key: string, value: any, timeout: number) {
    AppCache.data[key] = value;
    this.countdown(key, timeout);
  }
  del(key: string) {
    delete AppCache.data[key];
  }
  reset() {
    AppCache.data = new AppCacheData();
  }
}

export interface ICreate<T> {
  create(data: T): Promise<T>;
}
export interface IUpdate<T> {
  update(data: T): Promise<T>;
}
export interface IDelete<T> {
  delete(id: string): Promise<T>;
}
