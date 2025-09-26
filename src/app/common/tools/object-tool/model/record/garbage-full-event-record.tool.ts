import { VideoPlaybackArgs } from '../../../../../html/share/video/component/video.model';
import { VideoArgs } from '../../../../../html/share/video/video-multiple/video-multiple.model';
import { GarbageFullEventRecord } from '../../../../network/model/garbage-station/event-record/garbage-full-event-record.model';
import { CameraImageUrl } from '../../../../network/model/url-model/camera-image-url.model';
import { CameraPictureUrl } from '../../../../network/model/url-model/camera-picture-url.model';
import { PicturesUrl } from '../../../../network/url/aiop/medium/pictures/pictures.url';
import { DateTimeTool } from '../../../date-time-tool/datetime.tool';

export class GarbageFullEventRecordTool {
  cameras(data: GarbageFullEventRecord) {
    let cameras: CameraImageUrl[] = [];
    if (data.Data.CameraImageUrls) {
      cameras.push(...data.Data.CameraImageUrls);
    }
    if (data.Data.HandleImageUrls) {
      cameras.push(...data.Data.HandleImageUrls);
    }
    return cameras;
  }

  videos(data: GarbageFullEventRecord) {
    let videos: VideoArgs[] = [];

    if (data.Data.CameraImageUrls) {
      videos.push(
        ...data.Data.CameraImageUrls.map((x) =>
          this.item.video(x, data.EventTime)
        )
      );
    }
    if (data.Data.HandleImageUrls && data.Data.HandleTime) {
      videos.push(
        ...data.Data.HandleImageUrls.map((x) =>
          this.item.video(x, data.Data.HandleTime!)
        )
      );
    }
    return videos;
  }

  pictures(
    data: GarbageFullEventRecord,
    get: (stationId: string) => Promise<CameraPictureUrl[]>
  ) {
    return get(data.Data.StationId).then((pictures) => {
      return pictures.map((picture) => {
        let video = new VideoArgs();
        if (picture.Id) {
          video.image = picture.Id;
        }
        video.playback = {
          cameraId: picture.CameraId,
          duration: DateTimeTool.before(data.EventTime, 30),
          stream: 1,
        };
        return video;
      });
    });
  }

  private item = {
    video: (data: CameraImageUrl, time: Date) => {
      let item = new VideoArgs();
      item.image = PicturesUrl.jpg(data.ImageUrl);
      item.playback = {
        cameraId: data.CameraId,
        duration: DateTimeTool.before(time, 30),
        stream: 1,
      } as VideoPlaybackArgs;
      return item;
    },
  };
}
