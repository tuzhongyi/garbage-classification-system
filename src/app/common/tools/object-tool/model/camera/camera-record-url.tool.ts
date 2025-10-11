import { VideoPlaybackArgs } from '../../../../../html/share/video/component/video.model';
import { VideoArgs } from '../../../../../html/share/video/video-multiple/video-multiple.model';
import { CameraRecordUrl } from '../../../../network/model/url-model/camera-record-url.model';
import { DateTimeTool } from '../../../date-time-tool/datetime.tool';

export class CameraRecordUrlTool {
  video = {
    playback: (data: CameraRecordUrl, date: Date) => {
      let item = new VideoArgs();

      item.playback = {
        cameraId: data.CameraId,
        duration: DateTimeTool.before(date, 30),
        stream: 1,
      } as VideoPlaybackArgs;
      return item;
    },
    preview: (data: CameraRecordUrl) => {
      let item = new VideoArgs();

      item.preview = {
        cameraId: data.CameraId,
        stream: 1,
      } as VideoPlaybackArgs;
      return item;
    },
  };
}
