import { EventEmitter } from '@angular/core';
import { Camera } from '../../../../../common/network/model/garbage-station/camera.model';
import { IDivision } from '../../../../../common/network/model/garbage-station/division.model';
import { GarbageStation } from '../../../../../common/network/model/garbage-station/garbage-station.model';
import { IasDevice } from '../../../../../common/network/model/ias/ias-device.model';
import { IasEventRecord } from '../../../../../common/network/model/ias/ias-event-record.model';
import { ObjectTool } from '../../../../../common/tools/object-tool/object.tool';
import { GarbageStationViewModel } from '../../../../../common/view-model/garbage-station.view-model';
import { GarbageManagementStreetIndex } from '../../../garbage-management-street/garbage-management-street.model';
import { GarbageManagementManagerComponent } from '../../garbage-management-manager.component';
import { VideoType } from '../../window/video/garbage-management-manager-video.window';

export class GarbageManagementManagerMapController {
  constructor(private that: GarbageManagementManagerComponent) {}
  move = new EventEmitter<[number, number]>();
  select = new EventEmitter<
    GarbageStation | IasDevice | IDivision | IasEventRecord
  >();
  load = new EventEmitter<void>();
  refresh = false;

  current?: GarbageStationViewModel;

  private get panel() {
    return this.that.panel;
  }
  private get window() {
    return this.that.window;
  }

  private video = {
    single: (camera: Camera) => {
      let args = {
        preview: {
          cameraId: camera.Id,
          stream: 1,
        },
      };
      this.window.video.ws.open(camera.Name, args);
    },
    multiple: (data: GarbageStation) => {
      if (!data.Cameras) return;
      let videos = data.Cameras.map((x) => {
        return ObjectTool.model.camera.preview(x);
      });
      this.window.video.multiple.open(data.Name, videos, VideoType.ws, data.Id);
    },
  };

  on = {
    camera: (data: GarbageStationViewModel) => {
      this.current = data;
      if (data.Cameras) {
        if (data.Cameras.length === 1) {
          this.video.single(data.Cameras[0]);
        } else {
          this.video.multiple(data);
        }
      }
    },
    mixedinto: (data: GarbageStationViewModel) => {
      this.current = data;
      this.panel.record.mixedinto.open({ stationId: data.Id });
    },
    illegaldrop: (data: GarbageStationViewModel) => {
      this.current = data;
      this.panel.record.illegaldrop.open({ stationId: data.Id });
    },
    illegalvehicle: (data: GarbageStationViewModel) => {
      this.current = data;
      this.panel.record.illegalvehicle.open({ stationId: data.Id });
    },
    garbagefull: (data: GarbageStationViewModel) => {
      this.current = data;
      this.panel.record.garbagefull.open({ stationId: data.Id });
    },
    garbagedrop: (data: GarbageStationViewModel) => {
      this.current = data;
      this.panel.record.garbagedrop.open({ stationId: data.Id });
    },
    error: (data: GarbageStationViewModel) => {
      this.current = data;
      this.panel.station.show = true;
    },
    device: {
      dblclick: (data: IasDevice) => {
        this.panel.street.clear();
        this.panel.street.args.deviceId = data.Id;
        this.panel.street.index = GarbageManagementStreetIndex.route;
        this.panel.street.show = true;
      },
    },
  };
}
