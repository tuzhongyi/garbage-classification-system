import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { IllegalDropEventRecord } from '../../../../../common/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { DateTimeTool } from '../../../../../common/tools/date-time-tool/datetime.tool';
import { GarbageManagementManagerWindow } from '../../window/garbage-management-manager.window';

export class GarbageManagementManagerRecordIllegalDropPanel extends WindowViewModel {
  constructor(private window: GarbageManagementManagerWindow) {
    super();
  }
  style = {
    height: 'calc(100% - 85px)',
    width: '100%',
    transform: 'translate(0,0)',
    top: '85px',
    zIndex: '1',
  };
  title = '垃圾乱投';

  open() {
    this.show = true;
  }

  on = {
    image: (data: PagedArgs<IllegalDropEventRecord>) => {
      if (data.data.ImageUrl) {
        this.window.picture.title =
          data.data.ResourceName ?? data.data.Data.StationName;
        this.window.picture.args = {
          id: data.data.ImageUrl,
        };
        this.window.picture.page = data.page;
        this.window.picture.show = true;
      }
    },
    video: (data: IllegalDropEventRecord) => {
      if (data.ResourceId) {
        this.window.video.title = data.ResourceName ?? data.Data.StationName;
        this.window.video.args.playback = {
          cameraId: data.ResourceId,
          duration: DateTimeTool.before(data.EventTime, 30),
          stream: 1,
        };
        this.window.video.show = true;
      }
    },
  };
}
