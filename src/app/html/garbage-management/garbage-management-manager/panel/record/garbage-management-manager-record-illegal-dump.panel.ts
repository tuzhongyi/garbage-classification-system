import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { IllegalDropEventRecord } from '../../../../../common/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { PagedList } from '../../../../../common/network/model/page_list.model';
import { DateTimeTool } from '../../../../../common/tools/date-time-tool/datetime.tool';
import { ObjectTool } from '../../../../../common/tools/object-tool/object.tool';
import { GarbageManagementRecordEventIllegalDumpArgs } from '../../../garbage-management-container/garbage-management-record-event-illegal-dump/garbage-management-record-event-illegal-dump.model';
import { GarbageManagementManagerWindow } from '../../window/garbage-management-manager.window';

export class GarbageManagementManagerRecordIllegalDumpPanel extends WindowViewModel {
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
  title = '垃圾偷倒';
  args: GarbageManagementRecordEventIllegalDumpArgs = {};

  open(args: GarbageManagementRecordEventIllegalDumpArgs) {
    this.args = args;
    this.show = true;
  }

  on = {
    image: (data: PagedArgs<IllegalDropEventRecord>) => {
      let datas = ObjectTool.model.record.illegaldrop.cameras(data.data);
      let paged = PagedList.create(datas, data.page.PageIndex, 1);
      this.window.picture.open(paged);
    },
    video: (data: IllegalDropEventRecord) => {
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
  };
}
