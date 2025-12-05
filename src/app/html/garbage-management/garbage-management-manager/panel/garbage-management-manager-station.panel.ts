import { EventEmitter } from '@angular/core';
import { WindowViewModel } from '../../../../common/components/window/window.model';
import { StationType } from '../../../../common/enum/station-type.enum';
import { GarbageStation } from '../../../../common/network/model/garbage-station/garbage-station.model';
import { PagedArgs } from '../../../../common/network/model/model.interface';
import { PagedList } from '../../../../common/network/model/page_list.model';
import { ObjectTool } from '../../../../common/tools/object-tool/object.tool';
import { GarbageManagementManagerComponent } from '../garbage-management-manager.component';

export class GarbageManagementManagerStationPanel extends WindowViewModel {
  event = {
    move: new EventEmitter<[number, number]>(),
    select: new EventEmitter<GarbageStation>(),
  };
  constructor(private that: GarbageManagementManagerComponent) {
    super();
  }
  style = {
    height: 'calc(100% - 85px)',
    width: '100%',
    transform: 'translate(0,0)',
    top: '85px',
    zIndex: '1',
  };
  title = '投放点';

  args = {
    type: undefined as StationType | undefined,
  };

  private get business() {
    return this.that.business;
  }
  private get window() {
    return this.that.window;
  }

  private clear() {
    this.args.type = undefined;
  }

  open(type?: StationType) {
    this.clear();
    this.args.type = type;
    this.show = true;
  }

  on = {
    image: (data: PagedArgs<GarbageStation>) => {
      if (data.data.Cameras) {
        let datas = data.data.Cameras.map((x) => {
          return ObjectTool.model.camera.url(x);
        });
        let paged = PagedList.create(datas, data.page.PageIndex, 1);
        this.window.picture.open(paged);
      }
    },
    video: (data: GarbageStation) => {
      this.window.video.multiple.clear();
      this.window.video.multiple.loading = true;
      this.window.video.multiple.title = data.Name;
      this.business.station
        .capture(data.Id)
        .then((pictures) => {
          this.window.video.multiple.datas = pictures.map((picture) => {
            return ObjectTool.model.camera.picture.video(picture);
          });
        })
        .finally(() => {
          this.window.video.multiple.loading = false;
        });
      this.window.video.multiple.show = true;
    },
    position: (data: GarbageStation) => {
      this.show = false;
      this.event.select.emit(data);
      // if (data.GisPoint) {
      //   let position: [number, number] = [
      //     data.GisPoint.Longitude,
      //     data.GisPoint.Latitude,
      //   ];
      //   this.event.move.emit(position);
      // }
    },
  };
}
