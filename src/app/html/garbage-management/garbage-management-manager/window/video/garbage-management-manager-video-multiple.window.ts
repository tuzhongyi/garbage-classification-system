import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { SizeTool } from '../../../../../common/tools/size-tool/size.tool';
import { VideoArgs } from '../../../../share/video/video-multiple/video-multiple.model';

export class GarbageManagementManagerVideoMultipleWindow extends WindowViewModel {
  constructor() {
    super();
  }
  play?: (args: VideoArgs) => void;
  style = {
    ...SizeTool.window.large,
    zIndex: '100',
  };
  title = '';

  datas: VideoArgs[] = [];
  loading = false;
  playable = true;

  clear() {
    this.datas = [];
    this.title = '';
    this.loading = false;
    this.playable = true;
  }

  on = {
    play: (index: number) => {
      if (this.play) {
        let args = this.datas[index];
        this.play(args);
      }
    },
  };
}
