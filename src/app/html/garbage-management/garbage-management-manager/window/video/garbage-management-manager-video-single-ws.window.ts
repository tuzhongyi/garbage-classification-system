import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { SizeTool } from '../../../../../common/tools/size-tool/size.tool';
import {
  VideoPlaybackArgs,
  VideoPreviewArgs,
} from '../../../../share/video/component/video.model';

export class GarbageManagementManagerVideoSingleWSWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
    zIndex: '100',
  };
  args: {
    preview?: VideoPreviewArgs;
    playback?: VideoPlaybackArgs;
  } = {};
  title = '';
  mask = true;

  clear() {
    this.title = '';
    this.args = {};
    this.mask = true;
  }

  open(
    title: string,
    args: { preview?: VideoPreviewArgs; playback?: VideoPlaybackArgs },
    mask = true
  ) {
    this.title = title;
    this.args = args;
    this.mask = mask;
    this.show = true;
  }
}
