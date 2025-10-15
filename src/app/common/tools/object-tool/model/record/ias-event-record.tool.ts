import { MKVVideoArgs } from '../../../../../html/garbage-management/garbage-management-manager/window/video/garbage-management-manager-video-single-mkv.window';
import { IasEventRecord } from '../../../../network/model/ias/ias-event-record.model';
import { CameraImageUrl } from '../../../../network/model/url-model/camera-image-url.model';
import { IRecordTool } from './record-tool.interface';

export class IasEventRecordTool implements IRecordTool<IasEventRecord> {
  videos(data: IasEventRecord): MKVVideoArgs[] {
    if (data.FileUrl) {
      let video = new MKVVideoArgs();
      video.src = data.FileUrl;
      let images = this.images(data);
      if (images.length > 0) {
        video.image = images[0];
      }
      return [video];
    }
    return [];
  }
  images(data: IasEventRecord): string[] {
    let cameras = this.cameras(data);
    let images = cameras.map((x) => x.ImageUrl);

    if (data.Assignment && data.Assignment.HandledImageUrls) {
      images.push(...data.Assignment.HandledImageUrls);
    }

    return images;
  }
  cameras(data: IasEventRecord): CameraImageUrl[] {
    let cameras: CameraImageUrl[] = [];
    if (data.Resources) {
      cameras = data.Resources.filter((x) => !!x.ImageUrl).map((x) => {
        let camera = new CameraImageUrl();
        camera.ImageUrl = x.ImageUrl ?? '';
        camera.Objects = x.Objects;
        camera.CameraId = x.ResourceId;
        camera.CameraName = `${data.DeviceName}-${x.ResourceName}`;
        return camera;
      });
    }
    return cameras;
  }
}
