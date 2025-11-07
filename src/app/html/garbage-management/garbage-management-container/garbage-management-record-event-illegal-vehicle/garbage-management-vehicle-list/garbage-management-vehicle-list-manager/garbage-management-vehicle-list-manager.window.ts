import { WindowViewModel } from '../../../../../../common/components/window/window.model';
import { Vehicle } from '../../../../../../common/network/model/garbage-station/vehicle/vehicle.model';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';

export class GarbageManagementVehicleListManagerWindow {
  details = new DetailsWindow();
  confirm = new ConfirmWindow();
}

class DetailsWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,

    zIndex: '2',
  };

  title = '车辆信息';
  data?: Vehicle;

  open(data: Vehicle) {
    this.data = data;
    this.show = true;
  }
  close() {
    this.show = false;
  }
}
export class ConfirmWindow extends WindowViewModel {
  data?: Vehicle;
  get content() {
    return `是否删除车辆 ${this.data?.PlateNo} ？`;
  }
}
