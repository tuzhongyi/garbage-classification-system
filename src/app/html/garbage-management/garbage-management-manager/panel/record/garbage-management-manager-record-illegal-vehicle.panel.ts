import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { IllegalVehicleEventRecord } from '../../../../../common/network/model/garbage-station/event-record/illegal-vehicle-event-record.model';
import { PagedList } from '../../../../../common/network/model/page_list.model';
import { CameraImageUrl } from '../../../../../common/network/model/url-model/camera-image-url.model';
import { ObjectTool } from '../../../../../common/tools/object-tool/object.tool';
import { GarbageManagementRecordEventIllegalVehicleArgs } from '../../../garbage-management-container/garbage-management-record-event-illegal-vehicle/garbage-management-record-event-illegal-vehicle.model';
import { GarbageManagementManagerComponent } from '../../garbage-management-manager.component';
import { VideoType } from '../../window/video/garbage-management-manager-video.window';

export class GarbageManagementManagerRecordIllegalVehiclePanel extends WindowViewModel {
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
  title = '非法清运';

  args: GarbageManagementRecordEventIllegalVehicleArgs = {};

  private get window() {
    return this.that.window;
  }

  open(args: GarbageManagementRecordEventIllegalVehicleArgs) {
    this.args = args;
    this.show = true;
  }

  on = {
    image: (paged: PagedList<CameraImageUrl>) => {
      this.window.picture.open(paged);
    },
    video: {
      single: (data: IllegalVehicleEventRecord) => {
        let videos = ObjectTool.model.record.illegalvehicle.videos(data);
        let title = data.Data.StationName;
        if (videos.length > 0) {
          this.window.video.mkv.open(title, videos[0]);
        }
      },
      multiple: (data: IllegalVehicleEventRecord) => {
        let videos = ObjectTool.model.record.illegalvehicle.videos(data);

        let title = data.Data.StationName;
        this.window.video.multiple.open(
          title,
          videos,
          VideoType.mkv,
          data.Data.StationId,
          false
        );
      },
    },
  };
}
