import { VideoArgs } from '../../../../../html/share/video/video-multiple/video-multiple.model';
import { GarbageDropEventRecord } from '../../../../network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { CameraImageUrl } from '../../../../network/model/url-model/camera-image-url.model';
import { CameraTool } from '../camera/camera.tool';
import { IRecordTool } from './record-tool.interface';

export class GarbageDropEventRecordTool
  implements IRecordTool<GarbageDropEventRecord>
{
  constructor(private camera: CameraTool) {}

  images(data: GarbageDropEventRecord) {
    let cameras = this.cameras(data);
    let images: string[] = [];
    for (let i = 0; i < cameras.length; i++) {
      images.push(cameras[i].ImageUrl);
    }
    return images;
  }

  cameras(data: GarbageDropEventRecord) {
    const cameras: CameraImageUrl[] = [];
    if (data.Data.DropImageUrls) {
      cameras.push(...data.Data.DropImageUrls.map((url) => url));
    }
    if (data.Data.TimeoutImageUrls) {
      cameras.push(...data.Data.TimeoutImageUrls.map((url) => url));
    }
    if (data.Data.HandleImageUrls) {
      cameras.push(...data.Data.HandleImageUrls.map((url) => url));
    }
    return cameras;
  }
  videos(data: GarbageDropEventRecord): VideoArgs[] {
    if (data.Data.HandleImageUrls && data.Data.HandleTime) {
      let time = data.Data.HandleTime;

      return data.Data.HandleImageUrls.map((x) =>
        this.camera.image.video.playback(x, time)
      );
    }

    if (data.Data.DropImageUrls) {
      return data.Data.DropImageUrls.map((x) =>
        this.camera.image.video.playback(x, data.Data.DropTime)
      );
    }

    return [];
  }
}
