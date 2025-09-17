import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Point } from '../../../network/model/garbage-station/point.model';
import { Page } from '../../../network/model/page_list.model';
import { PicturePolygonZoomComponent } from '../picture-polygon-zoom/picture-polygon-zoom.component';

@Component({
  selector: 'app-picture-list',
  imports: [CommonModule, PicturePolygonZoomComponent],
  templateUrl: './picture-list.component.html',
  styleUrl: './picture-list.component.less',
})
export class PictureListComponent {
  @Input() src?: string;
  @Input() id?: string;
  @Input() polygon: Point[] = [];
  @Input() zoom = true;
  @Input() page?: Page;
  @Output() pageChange = new EventEmitter<Page>();

  onprov(): void {
    if (this.page) {
      let page = new Page();
      page = Object.assign(page, this.page);
      page.PageIndex--;
      this.pageChange.emit(page);
    }
  }
  onnext(): void {
    if (this.page) {
      let page = new Page();
      page = Object.assign(page, this.page);
      page.PageIndex++;
      this.pageChange.emit(page);
    }
  }
}
