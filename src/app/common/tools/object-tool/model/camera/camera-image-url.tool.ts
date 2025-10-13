import { VideoPlaybackArgs } from '../../../../../html/share/video/component/video.model';
import { VideoArgs } from '../../../../../html/share/video/video-multiple/video-multiple.model';
import { DrawPolygon } from '../../../../components/picture/picture-polygon-multiple/picture-polygon-multiple.model';
import { CameraImageUrl } from '../../../../network/model/url-model/camera-image-url.model';
import { DateTimeTool } from '../../../date-time-tool/datetime.tool';

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

  video = {
    playback: (data: CameraImageUrl, time: Date): VideoArgs => {
      let item = new VideoArgs();
      item.image = data.ImageUrl;
      item.playback = {
        cameraId: data.CameraId,
        cameraName: data.CameraName,
        duration: DateTimeTool.before(time, 30),
        stream: 1,
      } as VideoPlaybackArgs;
      return item;
    },
    preview: (data: CameraImageUrl) => {
      let item = new VideoArgs();
      item.image = data.ImageUrl;
      item.preview = {
        cameraId: data.CameraId,
        cameraName: data.CameraName,
        stream: 1,
      } as VideoPlaybackArgs;
      return item;
    },
  };
}
