import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { IllegalVehicleEventRecord } from '../../../../../common/network/model/garbage-station/event-record/illegal-vehicle-event-record.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { PagedList } from '../../../../../common/network/model/page_list.model';
import { CameraImageUrl } from '../../../../../common/network/model/url-model/camera-image-url.model';
import { ObjectTool } from '../../../../../common/tools/object-tool/object.tool';
import { GarbageManagementManagerWindow } from '../../window/garbage-management-manager.window';
import { VideoType } from '../../window/video/garbage-management-manager-video.window';

export class GarbageManagementManagerRecordIllegalVehiclePanel extends WindowViewModel {
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
  title = '非法清运';

  open() {
    this.show = true;
  }

  on = {
    image: (data: PagedArgs<IllegalVehicleEventRecord>) => {
      let datas = ObjectTool.model.record.illegalvehicle.images(data.data);
      let cameras = datas.map((x) => {
        let camera = new CameraImageUrl();
        camera.CameraName = data.data.Data.StationName;
        camera.ImageUrl = x;
        return camera;
      });
      let paged = PagedList.create(cameras, data.page.PageIndex, 1);
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
