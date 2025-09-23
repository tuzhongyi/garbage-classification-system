import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { IasEventRecord } from '../../../../../common/network/model/ias/ias-event-record.model';
import { GarbageManagementManagerWindow } from '../../window/garbage-management-manager.window';

export class GarbageManagementManagerRecordIasPanel extends WindowViewModel {
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
  title = '暴露垃圾';

  on = {
    task: (data: IasEventRecord) => {
      this.window.record.ias.data = data;
      this.window.record.ias.show = true;
    },
  };
}
