import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { SizeTool } from '../../../../../common/tools/size-tool/size.tool';

export class GarbageManagementManagerVideoSingleMKVWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
    zIndex: '100',
  };

  title = '';
  mask = true;
  src?: string;

  clear() {
    this.title = '';
    this.src = undefined;
    this.mask = true;
  }

  open(title: string, src: string, mask = true) {
    this.title = title;
    this.src = src;
    this.mask = mask;
    this.show = true;
  }
}
