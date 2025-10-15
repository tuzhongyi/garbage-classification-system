import { EventEmitter } from '@angular/core';
import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { IasEventRecord } from '../../../../../common/network/model/ias/ias-event-record.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { PagedList } from '../../../../../common/network/model/page_list.model';
import { ObjectTool } from '../../../../../common/tools/object-tool/object.tool';
import { GarbageManagementManagerWindow } from '../../window/garbage-management-manager.window';

export class GarbageManagementManagerRecordIasPanel extends WindowViewModel {
  event = {
    position: new EventEmitter<IasEventRecord>(),
  };

  constructor(private window: GarbageManagementManagerWindow) {
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

  open() {
    this.show = true;
  }

  on = {
    position: (data: IasEventRecord) => {},
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
  };
}
