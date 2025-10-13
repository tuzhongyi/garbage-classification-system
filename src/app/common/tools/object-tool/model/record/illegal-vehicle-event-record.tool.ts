import { MKVVideoArgs } from '../../../../../html/garbage-management/garbage-management-manager/window/video/garbage-management-manager-video-single-mkv.window';
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
    let images: string[] = [];
    if (data.ImageUrl) {
      images.push(data.ImageUrl);
    }
    if (data.Data.PlateImageUrl) {
      images.push(data.Data.PlateImageUrl);
    }
    if (data.Data.VehicleImageUrl) {
      images.push(data.Data.VehicleImageUrl);
    }

    return images;
  }
  videos(data: IllegalVehicleEventRecord): MKVVideoArgs[] {
    let videos: MKVVideoArgs[] = [];

    if (data.Data.CameraImageUrls) {
      videos.push(
        ...data.Data.CameraImageUrls.map((x) =>
          this.camera.image.video.playback(x, data.EventTime)
        )
      );
    }

    if (data.Data.CameraRecordUrls) {
      for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        let cameraId = video.playback?.cameraId;
        if (!cameraId) {
          cameraId = video.preview?.cameraId;
        }
        if (cameraId) {
          let record = data.Data.CameraRecordUrls.find(
            (x) => x.CameraId === cameraId
          );
          video.src = record?.RecordUrl;
        }
      }
    }

    return videos;
  }
}
