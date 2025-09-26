import { VideoArgs } from '../../../../../html/share/video/video-multiple/video-multiple.model';
import { CameraPictureUrl } from '../../../../network/model/url-model/camera-picture-url.model';
import { DateTimeTool } from '../../../date-time-tool/datetime.tool';

export class CameraPictureUrlTool {
  video(data: CameraPictureUrl, time?: Date, stream = 1) {
    let video = new VideoArgs();
    if (data.Id) {
      video.image = data.Id;
    }
    if (time) {
      video.playback = {
        cameraId: data.CameraId,
        duration: DateTimeTool.before(time, 30),
        stream: stream,
      };
    } else {
      video.preview = {
        cameraId: data.CameraId,
        stream: stream,
      };
    }
    return video;
  }
}
