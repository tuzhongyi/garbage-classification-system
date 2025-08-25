import { ClassConstructor, instanceToPlain } from 'class-transformer';

import { PagedList } from '../model/page_list.model';
import { IParams } from './IParams.interface';
import { HowellAuthHttpService } from './howell-auth-http.service';
import { ServiceHelper } from './service-helper';

export class BaseRequestService {
  constructor(public http: HowellAuthHttpService) {}
  async get<T>(url: string, type: ClassConstructor<T>): Promise<T> {
    let response = await this.http.get<T>(url);
    return ServiceHelper.ResponseProcess<T>(response, type);
  }
  async put<T>(url: string, type: ClassConstructor<T>, model: T | IParams) {
    let data = instanceToPlain(model) as T;
    let response = await this.http.put(url, data);
    return ServiceHelper.ResponseProcess(response, type);
  }
  async post<T>(
    url: string,
    type: ClassConstructor<T>,
    params?: IParams
  ): Promise<T>;
  async post<T>(url: string, type: ClassConstructor<T>, model?: T): Promise<T>;

  async post<T>(url: string, type: ClassConstructor<T>, args?: T | IParams) {
    let data = instanceToPlain(args) as T | IParams;
    let response = await this.http.post(url, data);
    return ServiceHelper.ResponseProcess(response, type);
  }

  async poststring<T>(url: string, type: ClassConstructor<T>, args: string) {
    let response = await this.http.post<string>(url, args);
    return ServiceHelper.ResponseProcess(response, type);
  }

  async delete<T>(url: string, type: ClassConstructor<T>) {
    let response = await this.http.delete(url);
    return ServiceHelper.ResponseProcess(response, type);
  }
  async postArray<T>(url: string, type: ClassConstructor<T>, params?: IParams) {
    let data: IParams | undefined;
    if (params) {
      data = instanceToPlain(params) as IParams;
    }
    let response = await this.http.post<IParams, Array<T>>(url, data);

    return ServiceHelper.ResponseProcess(response, type);
  }
  async postReturnString(url: string, params?: IParams) {
    let data: IParams | undefined;
    if (params) {
      data = instanceToPlain(params) as IParams;
    }
    let response = await this.http.post<IParams, string>(url, data);
    return ServiceHelper.ResponseProcess(response, true);
  }

  postArrayBuffer<R>(url: string, data: ArrayBuffer): Promise<R> {
    return this.http.postArrayBuffer<R>(url, data);
  }

  async getArray<T>(url: string, type: ClassConstructor<T>) {
    let response = await this.http.getHowellResponse<IParams, Array<T>>(url);
    return ServiceHelper.ResponseProcess(response, type);
  }
  async paged<T>(url: string, type: ClassConstructor<T>, params: IParams) {
    let data = instanceToPlain(params) as IParams;
    let response = await this.http.post<IParams, PagedList<T>>(url, data);
    return ServiceHelper.ResponseProcess(response, type);
  }

  async getExcel(url: string) {
    let response = (await this.http.getStream(url)) as Blob;
    let buffer = await response.arrayBuffer();
    return new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
  }

  type<T>(type: ClassConstructor<T>): BaseTypeRequestService<T> {
    return new BaseTypeRequestService<T>(this, type);
  }
}

export class BaseTypeRequestService<T> {
  constructor(
    private service: BaseRequestService,
    private type: ClassConstructor<T>
  ) {}

  async get(url: string): Promise<T> {
    return this.service.get<T>(url, this.type);
  }
  async put(url: string, model: T) {
    return this.service.put<T>(url, this.type, model);
  }
  async post(url: string, model?: T): Promise<T>;
  async post(url: string, params?: IParams): Promise<T>;
  async post(url: string, args?: T | IParams) {
    if (args) {
      let plain = instanceToPlain(args);
      return this.service.post<T>(url, this.type, plain);
    }
    return this.service.post<T>(url, this.type, args);
  }
  async delete(url: string) {
    return this.service.delete<T>(url, this.type);
  }
  async postArray(url: string, params?: IParams) {
    let plain = instanceToPlain(params);
    return this.service.postArray<T>(url, this.type, plain);
  }
  async getArray(url: string) {
    return this.service.getArray<T>(url, this.type);
  }
  async paged(url: string, params: IParams) {
    let plain = instanceToPlain(params);
    return this.service.paged<T>(url, this.type, plain);
  }
}
