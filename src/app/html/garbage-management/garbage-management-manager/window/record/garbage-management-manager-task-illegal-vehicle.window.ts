import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { IllegalVehicleEventRecord } from '../../../../../common/network/model/garbage-station/event-record/illegal-vehicle-event-record.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { PagedList } from '../../../../../common/network/model/page_list.model';
import { CameraImageUrl } from '../../../../../common/network/model/url-model/camera-image-url.model';
import { ObjectTool } from '../../../../../common/tools/object-tool/object.tool';
import { SizeTool } from '../../../../../common/tools/size-tool/size.tool';
import { GarbageManagementManagerWindow } from '../garbage-management-manager.window';

export class GarbageManagementManagerTaskIllegalVehicleWindow extends WindowViewModel {
  constructor(private windwo: GarbageManagementManagerWindow) {
    super();
  }
  style = {
    ...SizeTool.window.large,

    zIndex: '2',
  };
  title = '处置工单';
  data?: IllegalVehicleEventRecord;

  open(data: IllegalVehicleEventRecord) {
    this.title = `非法清运工单`;
    this.data = data;
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
      this.windwo.picture.open(paged);
    },
    video: (data: PagedArgs<IllegalVehicleEventRecord>) => {
      let videos = ObjectTool.model.record.illegalvehicle.videos(data.data);
      let index = data.page.PageIndex - 1;
      if (videos.length > index) {
        let video = videos[index];
        let title = video.playback?.cameraName ?? '';
        if (!title) {
          title = video.preview?.cameraName ?? '';
        }
        if (!title) {
          title = data.data.Data.StationName;
        }
        this.windwo.video.mkv.open(title, video);
      }
    },
  };
}
