import { DrawPolygon } from '../../../../components/picture/picture-polygon-multiple/picture-polygon-multiple.model';
import { CameraImageUrl } from '../../../../network/model/url-model/camera-image-url.model';

export class CameraImageUrlTool {
  image(data: CameraImageUrl) {
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
    return { url: data.ImageUrl, polygon: polygon };
  }
}
