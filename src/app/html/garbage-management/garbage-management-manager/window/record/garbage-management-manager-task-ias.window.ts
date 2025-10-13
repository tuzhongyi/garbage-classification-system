import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { IasEventRecord } from '../../../../../common/network/model/ias/ias-event-record.model';
import { SizeTool } from '../../../../../common/tools/size-tool/size.tool';

export class GarbageManagementManagerTaskIasWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,

    zIndex: '1',
  };
  title = '暴露垃圾事件';
  data?: IasEventRecord;

  open(data: IasEventRecord) {
    this.data = data;
    this.show = true;
  }
}
