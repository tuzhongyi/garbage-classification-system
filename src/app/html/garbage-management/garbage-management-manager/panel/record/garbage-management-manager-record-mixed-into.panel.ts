import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { MixedIntoEventRecord } from '../../../../../common/network/model/garbage-station/event-record/mixed-into-event-record.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { PagedList } from '../../../../../common/network/model/page_list.model';
import { DateTimeTool } from '../../../../../common/tools/date-time-tool/datetime.tool';
import { ObjectTool } from '../../../../../common/tools/object-tool/object.tool';
import { GarbageManagementManagerBusiness } from '../../business/garbage-management-manager.business';
import { GarbageManagementManagerWindow } from '../../window/garbage-management-manager.window';
import { VideoType } from '../../window/video/garbage-management-manager-video.window';

export class GarbageManagementManagerRecordMixedIntoPanel extends WindowViewModel {
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
  title = '混合投放';

  open() {
    this.show = true;
  }

  on = {
    image: (data: PagedArgs<MixedIntoEventRecord>) => {
      let datas = ObjectTool.model.record.mixedinto.cameras(data.data);
      let paged = PagedList.create(datas, data.page.PageIndex, 1);
      this.window.picture.open(paged);
    },
    complete: (data: MixedIntoEventRecord) => {
      this.window.record.complete.open(data);
    },
    video: {
      single: (data: MixedIntoEventRecord) => {
        if (data.ResourceId) {
          let title = data.ResourceName ?? data.Data.StationName;
          let args = {
            playback: {
              cameraId: data.ResourceId,
              duration: DateTimeTool.before(data.EventTime, 30),
              stream: 1,
            },
          };
          this.window.video.ws.open(title, args);
        }
      },
      multiple: (data: MixedIntoEventRecord) => {
        let title = data.Data.StationName;
        let videos = ObjectTool.model.record.mixedinto.videos(data);
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
