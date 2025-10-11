import { VideoArgs } from '../../../../../html/share/video/video-multiple/video-multiple.model';
import { IllegalVehicleEventRecord } from '../../../../network/model/garbage-station/event-record/illegal-vehicle-event-record.model';
import { CameraImageUrl } from '../../../../network/model/url-model/camera-image-url.model';
import { CameraTool } from '../camera/camera.tool';
import { IRecordTool } from './record-tool.interface';

export class IllegalVehicleEventRecordTool
  implements IRecordTool<IllegalVehicleEventRecord>
{
  constructor(private camera: CameraTool) {}

  cameras(data: IllegalVehicleEventRecord) {
    let cameras: CameraImageUrl[] = [];
    if (data.Data.CameraImageUrls) {
      cameras.push(...data.Data.CameraImageUrls);
    }

    return cameras;
  }

  images(data: IllegalVehicleEventRecord) {
    let cameras = this.cameras(data);
    let images = cameras.map((x) => {
      return x.ImageUrl;
    });
    if (data.Data.PlateImageUrl) {
      images.push(data.Data.PlateImageUrl);
    }
    if (data.Data.VehicleImageUrl) {
      images.push(data.Data.VehicleImageUrl);
    }

    return images;
  }
  videos(data: IllegalVehicleEventRecord): VideoArgs[] {
    let videos: VideoArgs[] = [];

    if (data.Data.CameraImageUrls) {
      videos.push(
        ...data.Data.CameraImageUrls.map((x) =>
          this.camera.image.video.playback(x, data.EventTime)
        )
      );
    }
    if (data.Data.CameraRecordUrls) {
      videos.push(
        ...data.Data.CameraRecordUrls.map((x) => {
          let args = this.camera.record.video.playback(x, data.EventTime);
          return args;
        })
      );
    }

    return videos;
  }
}
