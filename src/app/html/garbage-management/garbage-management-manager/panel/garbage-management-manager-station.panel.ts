import { WindowViewModel } from '../../../../common/components/window/window.model';
import { StationType } from '../../../../common/enum/station-type.enum';
import { GarbageStation } from '../../../../common/network/model/garbage-station/garbage-station.model';
import { PagedArgs } from '../../../../common/network/model/model.interface';
import { PagedList } from '../../../../common/network/model/page_list.model';
import { ObjectTool } from '../../../../common/tools/object-tool/object.tool';
import { GarbageManagementManagerBusiness } from '../business/garbage-management-manager.business';
import { GarbageManagementManagerWindow } from '../window/garbage-management-manager.window';

export class GarbageManagementManagerStationPanel extends WindowViewModel {
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
  title = '投放点';

  args = {
    type: undefined as StationType | undefined,
  };

  private clear() {
    this.args.type = undefined;
  }

  open(type?: StationType) {
    this.clear();
    this.args.type = type;
    this.show = true;
  }

  on = {
    image: (data: PagedArgs<GarbageStation>) => {
      if (data.data.Cameras) {
        let datas = data.data.Cameras.map((x) => {
          return ObjectTool.model.camera.url(x);
        });
        let paged = PagedList.create(datas, data.page.PageIndex, 1);
        this.window.picture.open(paged);
      }
    },
    video: (data: GarbageStation) => {
      this.window.video.multiple.clear();
      this.window.video.multiple.loading = true;
      this.window.video.multiple.title = data.Name;
      this.business.station
        .pictures(data.Id)
        .then((pictures) => {
          this.window.video.multiple.datas = pictures.map((picture) => {
            return ObjectTool.model.camera.picture.video(picture);
          });
        })
        .finally(() => {
          this.window.video.multiple.loading = false;
        });
      this.window.video.multiple.show = true;
    },
    position: (data: GarbageStation) => {},
  };
}
