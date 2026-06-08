import { EventEmitter } from '@angular/core';
import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { Duration } from '../../../../../common/network/model/garbage-station/duration.model';
import { IasEventRecord } from '../../../../../common/network/model/ias/ias-event-record.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { PagedList } from '../../../../../common/network/model/page_list.model';
import { ObjectTool } from '../../../../../common/tools/object-tool/object.tool';
import { GarbageManagementRecordEventIasArgs } from '../../../garbage-management-container/garbage-management-record-event-ias/garbage-management-record-event-ias.model';
import { GarbageManagementManagerComponent } from '../../garbage-management-manager.component';

export class GarbageManagementManagerRecordIasPanel extends WindowViewModel {
  event = {
    position: new EventEmitter<IasEventRecord>(),
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
  title = '暴露垃圾';
  args: GarbageManagementRecordEventIasArgs = {};

  private get window() {
    return this.that.window;
  }

  clear() {
    this.args = {};
  }

  open(args: GarbageManagementRecordEventIasArgs) {
    this.args = args;
    this.show = true;
  }

  on = {
    position: (data: IasEventRecord) => {
      this.window.map.open(data);
    },
    image: (data: PagedArgs<IasEventRecord>) => {
      let cameras = ObjectTool.model.record.ias.cameras(data.data);
      let paged = PagedList.create(cameras, data.page.PageIndex, 1);
      this.window.picture.open(paged);
    },
    video: (data: IasEventRecord) => {
      let videos = ObjectTool.model.record.ias.videos(data);
      if (videos.length > 0) {
        this.window.video.mkv.open(`${data.DeviceName}`, videos[0]);
      }
    },
    association: (args: { duration: Duration; data: IasEventRecord }) => {
      let _args = {
        ...args,
      };
      _args.duration.begin.setMonth(_args.duration.begin.getMonth() - 1);
      this.window.association.open(args);
    },
  };
}
