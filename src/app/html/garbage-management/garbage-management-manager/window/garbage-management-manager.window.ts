import { WindowViewModel } from '../../../../common/components/window/window.model';

export class GarbageManagementManagerWindow {
  settings = new SettingsWindow();
}

class SettingsWindow extends WindowViewModel {
  style = {
    height: 'calc(100% - 85px)',
    width: '100%',
    transform: 'translate(0,0)',
    top: '85px',
    zIndex: '1',
  };
  title = '设置';
}
