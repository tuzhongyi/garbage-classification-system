import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { GarbageFullEventRecord } from '../../../../../common/network/model/garbage-station/event-record/garbage-full-event-record.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { PagedList } from '../../../../../common/network/model/page_list.model';
import { ObjectTool } from '../../../../../common/tools/object-tool/object.tool';
import { GarbageManagementManagerBusiness } from '../../business/garbage-management-manager.business';
import { GarbageManagementManagerWindow } from '../../window/garbage-management-manager.window';
import { VideoType } from '../../window/video/garbage-management-manager-video.window';

export class GarbageManagementManagerRecordGarbageFullPanel extends WindowViewModel {
  constructor(
    private window: GarbageManagementManagerWindow,
    private business: GarbageManagementManagerBusiness
  ) {
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

  open() {
    this.show = true;
  }

  on = {
    image: (data: PagedArgs<GarbageFullEventRecord>) => {
      let datas = ObjectTool.model.record.garbagefull.cameras(data.data);
      let paged = PagedList.create(datas, data.page.PageIndex, 1);
      this.window.picture.open(paged);
    },
    complete: (data: GarbageFullEventRecord) => {
      this.window.record.complete.open(data);
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
  };
}
