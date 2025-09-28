import { EventEmitter, Injectable } from '@angular/core';
import { IDivision } from '../../../../../common/network/model/garbage-station/division.model';
import { ObjectTool } from '../../../../../common/tools/object-tool/object.tool';
import { GarbageStationViewModel } from '../../../../../common/view-model/garbage-station.view-model';
import { VideoArgs } from '../../../../share/video/video-multiple/video-multiple.model';
import { GarbageManagementManagerPanel } from '../../panel/garbage-management-manager.panel';
import { GarbageManagementManagerWindow } from '../../window/garbage-management-manager.window';

@Injectable()
export class GarbageManagementManagerMapController {
  constructor(
    private panel: GarbageManagementManagerPanel,
    private window: GarbageManagementManagerWindow
  ) {
    window.video.multiple.play = (args) => {
      this.play(args);
    };
  }
  move = new EventEmitter<[number, number]>();
  select = new EventEmitter<IDivision>();
  load = new EventEmitter<void>();
  refresh = false;

  play(args: VideoArgs) {
    this.window.video.single.args.preview = args.preview;
    if (this.current) {
      this.window.video.single.title = this.current.Name;
    }
    this.window.video.single.show = true;
  }

  current?: GarbageStationViewModel;

  on = {
    camera: (data: GarbageStationViewModel) => {
      this.current = data;
      if (data.Cameras) {
        let videos = data.Cameras.map((x) => {
          return ObjectTool.model.camera.get.video(x);
        });
        this.window.video.multiple.playable = false;
        this.window.video.multiple.title = data.Name;
        this.window.video.multiple.datas = videos;
        this.window.video.multiple.show = true;
      }
    },
    mixedinto: (data: GarbageStationViewModel) => {
      this.current = data;
      this.panel.record.mixedinto.open();
    },
    illegaldrop: (data: GarbageStationViewModel) => {
      this.current = data;
      this.panel.record.illegaldrop.open();
    },
    garbagefull: (data: GarbageStationViewModel) => {
      this.current = data;
      this.panel.record.garbagefull.open();
    },
    garbagedrop: (data: GarbageStationViewModel) => {
      this.current = data;
      this.panel.record.garbagedrop.open();
    },
    error: (data: GarbageStationViewModel) => {
      this.current = data;
      this.panel.station.show = true;
    },
  };
}
