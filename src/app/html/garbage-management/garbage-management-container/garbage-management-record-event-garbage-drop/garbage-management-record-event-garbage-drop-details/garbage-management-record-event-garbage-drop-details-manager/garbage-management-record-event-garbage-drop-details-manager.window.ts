import { EventEmitter } from '@angular/core';
import { WindowViewModel } from '../../../../../../common/components/window/window.model';
import { IllegalDropEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { GarbageStationGarbageCountStatistic } from '../../../../../../common/network/model/garbage-station/garbage-station-sarbage-count-statistic.model';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';
import { VideoPlaybackArgs } from '../../../../../share/video/component/video.model';
import { VideoArgs } from '../../../../../share/video/video-multiple/video-multiple.model';

export class GarbageManagementRecordEventGarbageDropDetailsManagerWindow {
  image = new ImageWindow();
  video = {
    single: new VideoSingleWindow(),
    multiple: new VideoMultipleWindow(),
  };

  constructor() {
    this.regist.image();
    this.regist.video();
  }

  private regist = {
    image: () => {
      this.image.play.subscribe((args) => {
        this.video.single.open(args);
      });
    },
    video: () => {
      this.video.multiple.play.subscribe((args) => {
        this.video.single.open(args);
      });
    },
  };
}

class ImageWindow extends WindowViewModel {
  play = new EventEmitter<VideoPlaybackArgs>();
  style = {
    ...SizeTool.window.large,
    zIndex: '100',
  };
  title = '';
  data?: IllegalDropEventRecord;
  open(data: IllegalDropEventRecord) {
    this.data = data;
    this.title = data.Data.StationName;
    this.show = true;
  }

  on = {
    play: () => {
      if (!this.data) return;
      let videos = ObjectTool.model.record.illegaldrop.videos(this.data);
      if (videos.length > 0) {
        let video = videos[0];
        if (video.playback) {
          this.play.emit(video.playback);
        }
      }
    },
  };
}

class VideoMultipleWindow extends WindowViewModel {
  play = new EventEmitter<VideoPlaybackArgs>();
  style = {
    ...SizeTool.window.large,
    zIndex: '100',
  };
  title = '';
  datas: VideoArgs[] = [];
  statistic?: GarbageStationGarbageCountStatistic;
  date?: Date;

  open(
    title: string,
    datas: VideoArgs[],
    date?: Date,
    statistic?: GarbageStationGarbageCountStatistic
  ) {
    this.title = title;
    this.datas = datas;
    this.statistic = statistic;
    this.date = date;
    this.show = true;
  }

  on = {
    play: (index: number) => {
      let item = this.datas[index];

      if (item && item.playback) {
        this.play.emit(item.playback);
      }
    },
  };
}

class VideoSingleWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
    zIndex: '101',
  };

  title = '';
  playback = new EventEmitter<VideoPlaybackArgs>();
  private args?: VideoPlaybackArgs;

  open(args: VideoPlaybackArgs) {
    this.title = args.cameraName ?? '';
    this.args = args;
    this.show = true;
  }
  play() {
    if (this.args) {
      this.playback.emit(this.args);
    }
  }
}
