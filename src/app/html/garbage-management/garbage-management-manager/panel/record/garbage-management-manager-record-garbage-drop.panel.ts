import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { GarbageDropEventRecord } from '../../../../../common/network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { PagedList } from '../../../../../common/network/model/page_list.model';
import { ObjectTool } from '../../../../../common/tools/object-tool/object.tool';
import { GarbageManagementManagerBusiness } from '../../business/garbage-management-manager.business';
import { GarbageManagementManagerWindow } from '../../window/garbage-management-manager.window';
import { VideoType } from '../../window/video/garbage-management-manager-video.window';

export class GarbageManagementManagerRecordGarbageDropPanel extends WindowViewModel {
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
  title = '垃圾滞留';

  open() {
    this.show = true;
  }

  on = {
    image: (data: PagedArgs<GarbageDropEventRecord>) => {
      let datas = ObjectTool.model.record.garbagedrop.cameras(data.data);

      let paged = PagedList.create(datas, data.page.PageIndex, 1);
      this.window.picture.open(paged);
    },
    complete: (data: GarbageDropEventRecord) => {
      this.window.record.complete.open(data);
    },
    video: {
      single: (data: GarbageDropEventRecord) => {
        let videos = ObjectTool.model.record.garbagedrop.videos(data);
        if (videos.length > 0) {
          let video = videos[0];
          let title = data.ResourceName ?? data.Data.StationName;
          this.window.video.ws.open(title, video);
        }
      },
      multiple: (data: GarbageDropEventRecord) => {
        let title = data.Data.StationName;
        let videos = ObjectTool.model.record.garbagedrop.videos(data);
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
