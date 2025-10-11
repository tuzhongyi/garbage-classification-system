import { VideoArgs } from '../../../../../html/share/video/video-multiple/video-multiple.model';
import { Camera } from '../../../../network/model/garbage-station/camera.model';
import { CameraImageUrl } from '../../../../network/model/url-model/camera-image-url.model';
import { CameraImageUrlTool } from './camera-image-url.tool';
import { CameraPictureUrlTool } from './camera-picture-url.tool';
import { CameraRecordUrlTool } from './camera-record-url.tool';
export class CameraTool {
  picture = new CameraPictureUrlTool();
  image = new CameraImageUrlTool();
  record = new CameraRecordUrlTool();

  url(camera: Camera) {
    let url = new CameraImageUrl();
    url.CameraId = camera.Id;
    url.CameraName = camera.Name;
    url.ImageUrl = camera.ImageUrl ?? '';
    return url;
  }
  video(camera: Camera) {
    let video = new VideoArgs();
    video.image = camera.ImageUrl ?? '';
    video.preview = {
      cameraId: camera.Id,
      stream: 1,
    };
    return video;
  }
}
