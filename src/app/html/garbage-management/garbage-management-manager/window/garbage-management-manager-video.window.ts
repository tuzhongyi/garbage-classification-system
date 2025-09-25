import { WindowViewModel } from '../../../../common/components/window/window.model';
import { SizeTool } from '../../../../common/tools/size-tool/size.tool';
import {
  VideoPlaybackArgs,
  VideoPreviewArgs,
} from '../../../share/video/component/video.model';

export class GarbageManagementManagerVideoWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
    zIndex: '100',
  };
  args: {
    preview?: VideoPreviewArgs;
    playback?: VideoPlaybackArgs;
  } = {};
  title = '';

  clear() {
    this.title = '';
    this.args = {};
  }
}
