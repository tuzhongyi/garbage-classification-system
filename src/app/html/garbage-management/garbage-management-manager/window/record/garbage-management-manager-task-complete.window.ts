import { WindowViewModel } from '../../../../../common/components/window/window.model';
import { EventType } from '../../../../../common/enum/event-type.enum';
import { IEventRecord } from '../../../../../common/network/model/garbage-station/event-record/garbage-event-record.model';
import { Language } from '../../../../../common/tools/language';
import { SizeTool } from '../../../../../common/tools/size-tool/size.tool';

export class GarbageManagementManagerTaskCompleteWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,

    zIndex: '2',
  };
  title = '处置工单';
  data?: IEventRecord;

  open(data: IEventRecord) {
    let type = '';
    switch (data.EventType) {
      case EventType.GarbageDrop:
      case EventType.GarbageDropSuperTimeout:
      case EventType.GarbageDropTimeoutHandle:
      case EventType.GarbageDropTimeout:
      case EventType.GarbageDropHandle:
        type = '垃圾滞留';
        break;
      default:
        type = Language.EventType(data.EventType);
        break;
    }
    this.title = `${type}工单`;
    this.data = data;
    this.show = true;
  }
}
