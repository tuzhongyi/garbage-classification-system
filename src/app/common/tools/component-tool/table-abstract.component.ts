import { EventEmitter } from '@angular/core';
import { Page } from '../../network/model/page_list.model';
import { Language } from '../language';

export abstract class PagedTableAbstractComponent<T> {
  constructor(sticky: boolean = false) {
    this.sticky = sticky;
  }
  abstract widths: Array<string | undefined>;
  abstract load?: EventEmitter<any>;
  get table_height() {
    if (this.page) {
      if (
        this.page.RecordCount === 0 ||
        this.page.RecordCount == this.pageSize
      ) {
        return '100%';
      } else {
        if (this.sticky) {
          return `calc((100% - ${this.table_head_height}px) * ${
            this.page.RecordCount / this.page.PageSize
          } + ${this.table_head_height}px)`;
        } else {
          return `calc(100% * ${this.page.RecordCount / this.page.PageSize})`;
        }
      }
    }
    return undefined;
  }
  table_head_height = 60;
  sticky = false;

  Language = Language;
  datas: Array<T | undefined> = [];
  page: Page = new Page();
  loading = false;
  pageSize = 10;

  getPaged(count: number, size: number): Page {
    let current = size % count;
    if (current === 0) {
      current = size;
    }

    let page = {
      PageSize: size,
      PageCount: Math.ceil(count / size),
      PageIndex: Math.ceil(count / size),
      RecordCount: current,
      TotalRecordCount: count,
    };
    return page;
  }

  abstract loadData(index: number, size: number, ...args: any[]): void;

  pageEvent(page: Page) {
    this.loadData(page.PageIndex + 1, this.pageSize);
  }
}
