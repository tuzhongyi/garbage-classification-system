import { Injectable } from '@angular/core';
import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { SizeTool } from '../../../../../common/tools/size-tool/size.tool';
import { VideoArgs } from '../../../../share/video/video-multiple/video-multiple.model';

@Injectable()
export class GarbageManagementManagerVideoSingleMKVWindow extends WindowViewModel {
  constructor() {
    super();
  }
  style = {
    ...SizeTool.window.large,
    zIndex: '100',
  };

  title = '';
  mask = true;
  data?: MKVVideoArgs;

  clear() {
    this.title = '';
    this.data = undefined;
    this.mask = true;
  }

  open(title: string, data: MKVVideoArgs, mask = true) {
    this.title = title;
    this.data = data;
    this.mask = mask;
    this.show = true;
  }
}
export class MKVVideoArgs extends VideoArgs {
  src?: string;
}
