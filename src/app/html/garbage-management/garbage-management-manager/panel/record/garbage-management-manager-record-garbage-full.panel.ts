import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { GarbageFullEventRecord } from '../../../../../common/network/model/garbage-station/event-record/garbage-full-event-record.model';
import { GarbageStation } from '../../../../../common/network/model/garbage-station/garbage-station.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { PagedList } from '../../../../../common/network/model/page_list.model';
import { ObjectTool } from '../../../../../common/tools/object-tool/object.tool';
import { GarbageManagementRecordEventGarbageFullArgs } from '../../../garbage-management-container/garbage-management-record-event-garbage-full/garbage-management-record-event-garbage-full.model';
import { GarbageManagementManagerComponent } from '../../garbage-management-manager.component';
import { VideoType } from '../../window/video/garbage-management-manager-video.window';

export class GarbageManagementManagerRecordGarbageFullPanel extends WindowViewModel {
  constructor(private that: GarbageManagementManagerComponent) {
    super();
  }
  style = {
    height: 'calc(100% - 85px)',
    width: '100%',
    transform: 'translate(0,0)',
    top: '85px',
    zIndex: '1',
  };
  title = '垃圾满溢';

  args: GarbageManagementRecordEventGarbageFullArgs = {};

  private get window() {
    return this.that.window;
  }
  private get station() {
    return this.that.panel.station;
  }

  open(args: GarbageManagementRecordEventGarbageFullArgs) {
    this.args = args;
    this.show = true;
  }

  on = {
    image: (data: PagedArgs<GarbageFullEventRecord>) => {
      let datas = ObjectTool.model.record.garbagefull.cameras(data.data);
      let paged = PagedList.create(datas, data.page.PageIndex, 1);
      this.window.picture.open(paged);
    },
    complete: (data: GarbageFullEventRecord) => {
      this.window.task.complete.open(data);
    },
    video: {
      single: (data: GarbageFullEventRecord) => {
        let videos = ObjectTool.model.record.garbagefull.videos(data);
        if (videos.length > 0) {
          let video = videos[0];
          let title = data.ResourceName ?? data.Data.StationName;
          this.window.video.ws.open(title, video);
        }
      },
      multiple: (data: GarbageFullEventRecord) => {
        let title = data.Data.StationName;
        let videos = ObjectTool.model.record.garbagefull.videos(data);
        this.window.video.multiple.open(
          title,
          videos,
          VideoType.ws,
          data.Data.StationId
        );
      },
    },
    station: {
      image: (data: PagedArgs<GarbageStation>) => {
        this.station.on.image(data);
      },
      video: (data: GarbageStation) => {
        this.station.on.video(data);
      },
      position: (data: GarbageStation) => {
        this.show = false;
        this.station.on.position(data);
      },
    },
  };
}
