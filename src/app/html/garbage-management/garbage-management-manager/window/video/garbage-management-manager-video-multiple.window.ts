import { EventEmitter, Injectable } from '@angular/core';
import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { ObjectTool } from '../../../../../common/tools/object-tool/object.tool';
import { SizeTool } from '../../../../../common/tools/size-tool/size.tool';
import { VideoArgs } from '../../../../share/video/video-multiple/video-multiple.model';
import { GarbageManagementManagerBusiness } from '../../business/garbage-management-manager.business';
import { MKVVideoArgs } from './garbage-management-manager-video-single-mkv.window';
import { VideoType } from './garbage-management-manager-video.window';

@Injectable()
export class GarbageManagementManagerVideoMultipleWindow extends WindowViewModel {
  play = new EventEmitter<{
    title: string;
    args: VideoArgs;
    type: VideoType;
  }>();

  constructor(private business: GarbageManagementManagerBusiness) {
    super();
  }

  style = {
    ...SizeTool.window.large,
    zIndex: '100',
  };
  title = '';

  datas: MKVVideoArgs[] = [];
  loading = false;
  playable = false;

  stationId?: string;

  private type = VideoType.ws;

  clear() {
    this.datas = [];
    this.title = '';
    this.stationId = undefined;
    this.loading = false;
    this.playable = false;
    this.type = VideoType.ws;
  }
  open(
    title: string,
    datas: MKVVideoArgs[],
    type: VideoType,
    stationId?: string,
    captureable = true
  ) {
    this.clear();
    this.type = type;
    this.title = title;
    this.datas = datas;
    this.stationId = stationId;
    this.capture.did = !captureable;
    this.show = true;
  }

  on = {
    play: (index: number) => {
      if (this.play) {
        let args = this.datas[index];
        this.play.emit({ title: this.title, args: args, type: this.type });
      }
    },
    error: (args: { index: number; event: Event }) => {
      if (this.capture.did == false && this.capture.doing == false) {
        this.capture.do();
      }
    },
  };

  private capture = {
    did: false,
    doing: false,
    do: () => {
      this.capture.doing = true;
      return new Promise<void>((resolve) => {
        if (this.stationId) {
          this.loading = true;
          this.business.station
            .pictures(this.stationId)
            .then((pictures) => {
              this.datas = pictures.map((picture) => {
                return ObjectTool.model.camera.picture.video(picture);
              });
            })
            .finally(() => {
              this.loading = false;
              this.capture.did = true;
              resolve();
              this.capture.doing = false;
            });
        }
      });
    },
  };
}
