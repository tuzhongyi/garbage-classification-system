import { ClassConstructor } from 'class-transformer';
import { Page } from './page_list.model';

export interface IModel {}
export interface IIdModel<T = string> extends IModel {
  Id: T;
}
export interface IIdNameModel<TId = string> extends IIdModel<TId> {
  Name: string;
}
export class IdNameModel<TId = string> implements IIdNameModel<TId> {
  Id!: TId;
  Name!: string;

  equals<T extends IdNameModel>(
    value?: IdNameModel,
    type?: ClassConstructor<T>
  ) {
    if (!value) return false;
    if (type) {
      if (type.name !== value.constructor.name) {
        return false;
      }
    }

    return this.Id === value.Id;
  }
}
export interface PagedArgs<T = any> {
  data: T;
  page: Page;
}
export interface ImagePagedArgs<T = any> extends PagedArgs<T> {
  index: number;
}
export interface INameValueModel<T> {
  Name: string;
  Value: T;
}
