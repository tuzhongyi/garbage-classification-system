import { MKVVideoArgs } from '../../../../../html/garbage-management/garbage-management-manager/window/video/garbage-management-manager-video-single-mkv.window';
import { VideoPlaybackArgs } from '../../../../../html/share/video/component/video.model';
import { VideoArgs } from '../../../../../html/share/video/video-multiple/video-multiple.model';
import { CameraRecordUrl } from '../../../../network/model/url-model/camera-record-url.model';
import { DateTimeTool } from '../../../date-time-tool/datetime.tool';

export class CameraRecordUrlTool {
  video = {
    playback: (data: CameraRecordUrl, date: Date) => {
      let item = new MKVVideoArgs();

      item.playback = {
        cameraId: data.CameraId,
        cameraName: data.CameraName,
        duration: DateTimeTool.before(date, 30),
        stream: 1,
        src: data.RecordUrl,
      } as VideoPlaybackArgs;
      item.src = data.RecordUrl;
      return item;
    },
    preview: (data: CameraRecordUrl) => {
      let item = new VideoArgs();

      item.preview = {
        cameraId: data.CameraId,
        cameraName: data.CameraName,
        stream: 1,
      } as VideoPlaybackArgs;
      return item;
    },
  };
}
