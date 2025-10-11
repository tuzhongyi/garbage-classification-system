import { DrawPolygon } from '../../../../common/components/picture/picture-polygon-multiple/picture-polygon-multiple.model';
import { WindowViewModel } from '../../../../common/components/window/window.model';
import {
  Page,
  PagedList,
} from '../../../../common/network/model/page_list.model';
import { CameraImageUrl } from '../../../../common/network/model/url-model/camera-image-url.model';
import { PicturesUrl } from '../../../../common/network/url/aiop/medium/pictures/pictures.url';
import { SizeTool } from '../../../../common/tools/size-tool/size.tool';

export class GarbageManagementManagerPictureWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
    zIndex: '100',
  };
  title = '';

  page?: Page;
  datas: CameraImageUrl[] = [];
  current?: {
    url: string;
    polygon?: DrawPolygon[];
  };

  on = {
    page: {
      change: (page: Page) => {
        this.page = page;
        let index = page.PageIndex - 1;
        if (this.datas.length > index) {
          let data = this.datas[index];
          if (data) {
            let src = '';
            if (data.ImageUrl) {
              if (
                data.ImageUrl.indexOf('/') < 0 &&
                data.ImageUrl.indexOf('\\') < 0
              ) {
                src = PicturesUrl.jpg(data.ImageUrl);
              } else {
                src = data.ImageUrl;
              }
            }

            this.current = {
              url: src,
            };
            if (data.CameraName) {
              this.title = data.CameraName;
            }

            let polygon: DrawPolygon[] = [];
            if (data.Objects) {
              polygon = data.Objects.map((x) => {
                let polygon = new DrawPolygon(x.Polygon);
                polygon.color = 'red';
                return polygon;
              });
            }
            if (data.Rules) {
              polygon = polygon.concat(
                data.Rules.filter((x) => !!x.Polygon).map((x) => {
                  let polygon = new DrawPolygon(x.Polygon!);
                  polygon.color = 'blue';
                  return polygon;
                })
              );
            }
            this.current.polygon = polygon;
          }
        }
      },
    },
  };

  open(paged: PagedList<CameraImageUrl>) {
    this.page = paged.Page;
    this.datas = paged.Data;
    this.on.page.change(this.page);
    this.show = true;
  }
}
