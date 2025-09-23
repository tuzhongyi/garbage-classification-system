import { WindowViewModel } from '../../../../common/components/window/window.model';

export class GarbageManagementManagerStreetPanel extends WindowViewModel {
  style = {
    height: 'calc(100% - 85px)',
    width: '100%',
    transform: 'translate(0,0)',
    top: '85px',
    zIndex: '1',
  };
  title = '巡逻车辆';
  online?: boolean = undefined;
  clear() {
    this.online = undefined;
  }
}
